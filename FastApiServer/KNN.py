
from typing import List
from fastapi import Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


import databases
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
app = FastAPI()
DATABASE_URL = "postgresql://postgres:apple@localhost/skillswap"
database = databases.Database(DATABASE_URL)
jobs = pd.read_csv('F:/ON DEV/csv files/job_descriptions.csv')
jobs = jobs.drop_duplicates(subset=['Job_Title'])
tfidf_vectorizer = TfidfVectorizer()
job_title_matrix = tfidf_vectorizer.fit_transform(jobs['skills'])
model = NearestNeighbors(n_neighbors=10, algorithm='auto')
model.fit(job_title_matrix)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def get_user_skills(user_id: int):
    try:
        await database.connect()
        query = "SELECT skills FROM users WHERE user_id = :user_id"
        user_skills_list = await database.fetch_val(query=query, values={"user_id": user_id})

        if user_skills_list:
           
            user_skills = ', '.join(user_skills_list)
            return user_skills
        else:
            return None
    finally:
        await database.disconnect()



def recommend_jobs(skill):
    skill_vectorized = tfidf_vectorizer.transform([skill])
    _, indices = model.kneighbors(skill_vectorized)
    recommended_jobs = jobs.iloc[indices[0]]
    return recommended_jobs[['Job_Title']]


@app.get("/recommend_jobs/{user_id}")
async def get_recommended_jobs(user_id: int = Path(...)):
    print(user_id) 

    user_skills = await get_user_skills(user_id)
    if user_skills:
        recommended_jobs = recommend_jobs(user_skills)
        return recommended_jobs.to_dict(orient='records')
    else:
        return {"message": "User skills not found"}

@app.get("/")
async def root():
    return {"message": "Hello, this is the root endpoint!"}








@app.get("/job_titles")
async def get_job_titles():
    try:
        await database.connect()

        query = "SELECT title FROM jobs"
        job_titles = await database.fetch_all(query)

        return {"job_titles": [record['title'] for record in job_titles]}
    except Exception as e:
        return {"message": f"An error occurred: {e}"}
    finally:
        await database.disconnect()


async def find_similar_job_titles():
    try:
        await database.connect()

        query = "SELECT job_id, title, company_name, location FROM jobs"
        job_records_db = await database.fetch_all(query)

        dataset_job_titles = set(jobs['Job_Title'])
        db_jobs_info = {record['title']: {  'job_id':record['job_id'], 'company_name': record['company_name'], 'location': record['location']}
                        for record in job_records_db}

        similar_jobs_info = []
        for title in dataset_job_titles.intersection(db_jobs_info.keys()):
            similar_jobs_info.append({
                'title': title,
                'company_name': db_jobs_info[title]['company_name'],
                'location': db_jobs_info[title]['location'],
                  'job_id': db_jobs_info[title]['job_id']
            })

        return {"similar_job_info": similar_jobs_info}
    except Exception as e:
        return {"message": f"An error occurred: {e}"}
    finally:
        await database.disconnect()


@app.get("/similar_job_titles")
async def get_similar_job_titles():
    similar_job_info = await find_similar_job_titles()
    return similar_job_info





def calculate_precision_recall(recommended_jobs, ground_truth):
    recommended_set = set(recommended_jobs)
    true_positives = len(recommended_set.intersection(ground_truth))
    precision = true_positives / len(recommended_set) if recommended_set else 0
    recall = true_positives / len(ground_truth) if ground_truth else 0
    return precision, recall




@app.get("/precision/{user_id}")
async def get_recommended_jobs(user_id: int = Path(...)):
    user_skills = await get_user_skills(user_id)
    if user_skills:
        recommended_jobs_df = recommend_jobs(user_skills)
        recommended_jobs = recommended_jobs_df['Job_Title'].tolist()

       
        dummy_ground_truth = {
            '32': ["Back-End Developer",
                   "Java Developer",
                   "Software Engineer",
                   "Database Administrator",
                   "Business Development Manager",
                   "Software Developer",
                   "Data Scientist",
                   ]
        }

        
        ground_truth = dummy_ground_truth.get(str(user_id), [])

        precision, recall = calculate_precision_recall(
            recommended_jobs, ground_truth)

        return {
            "recommended_jobs": recommended_jobs,
            "precision": precision,
            "recall": recall
        }
    else:
        return {"message": "User skills not found"}
