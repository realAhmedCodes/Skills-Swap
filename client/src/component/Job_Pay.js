import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Job_docs } from "./Job_docs";
import { Job_Desc } from "./Job_Desc";
import { useDispatch } from "react-redux";
import { addJobPay } from "../slices/Job_Pay";
import { Navbar } from "../component/Navbar";
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

  const navPageBackward = (e) => {
    e.preventDefault();
    nav("/Job_Desc");
  };
  //console.log(rate, amount);

  return (
    <div className="main">
      <Navbar></Navbar>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <form className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Select Amount Type
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline-blue"
            onChange={(e) => {
              setAmountType(e.target.value);
            }}
          >
            <option value="range">Range</option>
            <option value="min_amount">Minimum Amount</option>
            <option value="max_amount">Maximum Amount</option>
            <option value="exact_amount">Exact Amount</option>
          </select>

          {amountType === "range" && (
            <div className="flex space-x-4">
              <input
                type="text"
                id="range1"
                name="range1"
                placeholder="From"
                className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline-blue"
                onChange={(e) => {
                  setRange1(e.target.value);
                }}
              />
              <input
                type="text"
                id="range2"
                name="range2"
                placeholder="To"
                className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline-blue"
                onChange={(e) => {
                  setRange2(e.target.value);
                }}
              />
            </div>
          )}

          {(amountType === "min_amount" ||
            amountType === "max_amount" ||
            amountType === "exact_amount") && (
            <input
              type="text"
              id="salary"
              name="salary"
              placeholder={
                amountType === "min_amount"
                  ? "Min Salary"
                  : amountType === "max_amount"
                  ? "Max Salary"
                  : "Exact Salary"
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline-blue"
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
          )}

          <label className="block mt-4 text-gray-700 text-sm font-semibold mb-1">
            Select Rate
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline-blue"
            onChange={(e) => {
              setRate(e.target.value);
            }}
          >
            <option value="Per day">Per day</option>
            <option value="Per Month">Per Month</option>
            <option value="Annual">Annual</option>
          </select>
        </form>

        <div className="flex justify-between">
          <button
            onClick={navPageBackward}
            className="bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
          >
            Back
          </button>
          <button
            onClick={navPageForward}
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};