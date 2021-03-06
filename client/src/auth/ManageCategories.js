import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./helper";
import { getAllCategoies, deleteCategory } from "./helper/adminapicall";
import AdminDashBoard from "../user/AdminDashBoard";

const ManageCategories = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategoies().then((data) => {
      if (data.data && data.data && data.data.error) {
        console.log(data.data && data.data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const successMessage = () => {
    if (success) {
      return (
        <p className="pt-2 font-medium text-md text-center bg-gray-50 text-green-600">
          Category Deletd sucessfully
        </p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <p className="pt-2 font-medium text-md text-center bg-gray-50 text-red-600">
          Failed to delete the category
        </p>
      );
    }
  };

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.data && data.data.error) {
        console.log(data.data && data.data.error);
        setError(data.data.error);
      } else {
        preload();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      }
    });
  };

  return (
    <AdminDashBoard>
      <>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            Manage Categories
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-700">
            Update or Delete the existing categories
          </p>
        </div>
        <div className="border-t border-gray-200">
          {successMessage()}
          {errorMessage()}
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className={`px-4 py-5 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } sm:p-6 grid grid-cols-6 gap-6`}
              >
                <div className="py-2 text-md font-medium text-gray-700 col-span-6 sm:col-span-3">
                  {category.name}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Link
                    className="py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                  <button
                    onClick={() => deleteThisCategory(category._id)}
                    className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    </AdminDashBoard>
  );
};

export default ManageCategories;
