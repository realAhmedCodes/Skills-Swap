import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Job_docs } from "./Job_docs";
import { Job_Desc } from "./Job_Desc";
import { useDispatch } from "react-redux";
import { addJobPay } from "../slices/Job_Pay";
export const Job_Pay = () => {
  const [amountType, setAmountType] = useState("range");
  const [rate, setRate] = useState("Per day");
  const [salary, setSalary] = useState("");
  const [range1, setRange1] = useState("");
  const [range2, setRange2] = useState("");
  const dispatch = useDispatch();

  /*useEffect(() => {
    /*console.log(amountType);
    console.log(rate, amount);
  }, [amountType, rate, salary, range1, range2]);*/
  const nav = useNavigate();

  const navPageForward = (e) => {
   
    e.preventDefault();

    let calculatedAmount =
      amountType === "range" ? `${range1} to ${range2}` : salary;

    const jobPay = {
      rate,
      salary: calculatedAmount,
    };
    dispatch(addJobPay(jobPay));
    nav("/Job_docs");
  };
  
  const navPageBackword = (e) => {
    e.preventDefault();
    nav("/Job_Desc");
  };
  //console.log(rate, amount);

  return (
    <div className="main_div">
      <form action="">
        <select
          onChange={(e) => {
            setAmountType(e.target.value);
          }}
        >
          <option value="range"> Range</option>
          <option value="min_amount"> Minimum Amount</option>
          <option value="max_amount"> Maximun Amount</option>
          <option value="exact_amount">Exact Amount</option>
        </select>
        {amountType === "range" ? (
          <>
            <input
              type="text"
              id="range1"
              name="range1"
              placeholder="From"
              onChange={(e) => {
                setRange1(e.target.value);
              }}
            />
            <input
              type="text"
              id="range2"
              name="range2"
              placeholder="To"
              onChange={(e) => {
                setRange2(e.target.value);
              }}
            />
          </>
        ) : (
          ""
        )}
        {amountType === "min_amount" ? (
          <>
            <input
              type="text"
              id="min_amount"
              name="min_amount"
              placeholder="Min Salary"
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
          </>
        ) : (
          ""
        )}
        {amountType === "max_amount" ? (
          <>
            <input
              type="text"
              id="max_amount"
              name="max_amount"
              placeholder="Max Salary"
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
          </>
        ) : (
          ""
        )}

        {amountType === "exact_amount" ? (
          <>
            <input
              type="text"
              id="exact_amount"
              name="exact_amount"
              placeholder="Eaxct Salary"
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
          </>
        ) : (
          ""
        )}

        <select
          onChange={(e) => {
            setRate(e.target.value);
          }}
        >
          <option value="Per day"> Per day</option>
          <option value="Per Month"> Per Month</option>
          <option value="Annual"> Annual</option>
        </select>
      </form>
      <button onClick={navPageForward}>Next</button>
      <button onClick={navPageBackword}>Back</button>
    </div>
  );
};
