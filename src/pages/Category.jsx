import LeftSidebar from "../components/LeftSidebar";
import { useState, useEffect } from "react";
import $ from "jquery";
import "../../node_modules/datatables.net-dt/css/dataTables.dataTables.min.css";
import "../../node_modules/datatables.net-dt";
import axios from "axios";
import url from "../constants/baseUrl";

const Category = () => {
  const [data, setData] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [successAddModal, setSuccessAddModal] = useState(false);
  const [successEditModal, setSuccessEditModal] = useState(false);

  const [departmentName, setDepartmentName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [shortName, setShortName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState("NO");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      department_id: departmentName,
      category_name: categoryName,
      category_short_name: shortName,
      category_image_url: imageUrl,
      is_active: isActive,
    };

    try {
      await axios.post(`${url}/api/category/add-category`, categoryData);
      setShowAddModal(false);
      setSuccessAddModal(true);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/department/get-department`);
        const result = await response.json();
        setDepartment(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/category/get-category`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      $("#example").DataTable({
        destroy: true,
      });
    }
  }, [data]);

  const handleEditClick = (deptId) => {
    setShowEditModal(true);
    axios
      .get(`${url}/api/category/get-category-id/${deptId}`)
      .then((response) => {
        setSelectedDepartment(response.data);
        console.log(response.data);
      });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${url}/api/category/update-category/${selectedDepartment._id}`,
        selectedDepartment
      );

      if (response.status === 200) {
        setShowEditModal(false);
        setSuccessEditModal(true);
        console.log("Category updated successfully!");
        // Optionally reload data or update the list of categories
      } else {
        console.error("Failed to update Category");
      }
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };

  const handleDeleteClick = (deptId) => {
    setSelectedDeptId(deptId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${url}/api/category/delete-category/${selectedDeptId}`
      );
      // After successful delete, hide the modal and refresh the data (or filter the deleted item locally)
      setShowDeleteModal(false);
      setSuccessModal(true);
      console.log("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold mb-4">Categories</h1>

        {/* Container for title and button */}
        <div className="flex items-center justify-between mb-4 mt-16">
          <h3 className="text-xl font-semibold">Manage Categories</h3>
          <button
            className="bg-dark-purple text-white py-2 px-4 rounded hover:bg-dark-purple"
            onClick={() => setShowAddModal(true)}
          >
            Add Category
          </button>
        </div>
        <button
          className="bg-amber-300 text-dark py-2 px-4 rounded hover:bg-amber-300"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
        <div className="mt-16">
          {data.length > 0 ? (
            <>
              <table
                id="example"
                className="min-w-full table-auto bg-white border border-gray-300 shadow-md rounded-lg"
              >
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="py-3 px-6 text-left text-gray-600 font-semibold border-r border-gray-300">
                      Sl.No.
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-semibold border-r border-gray-300">
                      Department Name
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-semibold border-r border-gray-300">
                      Category Name
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-semibold border-r border-gray-300">
                      Short Name
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-semibold border-r border-gray-300">
                      Is Active
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((room, index) => (
                    <tr
                      key={room.id}
                      className="border-b border-gray-300 hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <td className="py-3 px-6 text-gray-700 border-r border-gray-300">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 text-gray-700 border-r border-gray-300">
                        {room.department_id?.department_name}
                      </td>
                      <td className="py-3 px-6 text-gray-700 border-r border-gray-300">
                        {room.category_name}
                      </td>
                      <td className="py-3 px-6 text-gray-700 border-r border-gray-300">
                        {room.category_short_name}
                      </td>
                      <td className="py-3 px-6 text-gray-700 border-r border-gray-300">
                        {room.is_active}
                      </td>
                      <td className="py-3 px-6 text-gray-700 space-x-2">
                        <button
                          type="button"
                          className="bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600 transition"
                          onClick={() => handleEditClick(room._id)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                          onClick={() => handleDeleteClick(room._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showDeleteModal && (
                <>
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm w-full">
                      <h3 className="text-xl font-semibold mb-4">
                        Are you sure you want to delete?
                      </h3>
                      <div className="flex justify-end space-x-4">
                        <button
                          className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                          onClick={() => setShowDeleteModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                          onClick={confirmDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {successModal && (
                <>
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm w-full">
                      <h3 className="text-xl font-semibold mb-4">
                        Successfully Deleted!
                      </h3>
                      <div className="flex justify-end space-x-4">
                        <button
                          className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                          onClick={() => {
                            setSuccessModal(false);
                            window.location.reload();
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <table
              id="example"
              className="min-w-full table-auto bg-white border border-gray-200 shadow-md rounded-lg"
            >
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                    Sl.No.
                  </th>
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                    Department Name
                  </th>
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold border-r border-gray-300">
                    Category Name
                  </th>
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                    Short Name
                  </th>
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                    Is Active
                  </th>
                  <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No Categories to Display
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Add Category</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Department</label>
                  <select
                    value={departmentName}
                    className="border p-2 w-full rounded"
                    onChange={(e) => setDepartmentName(e.target.value)}
                  >
                    <option>Select Department</option>
                    {departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.department_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Category Name</label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Short Name</label>
                  <input
                    type="text"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={isActive === "YES"}
                    onChange={() =>
                      setIsActive(isActive === "YES" ? "NO" : "YES")
                    }
                    className="mr-2"
                  />
                  <label className="text-gray-700">Is Active</label>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {successAddModal && (
          <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-4">
                  Successfully Added!
                </h3>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                    onClick={() => {
                      setSuccessAddModal(false);
                      window.location.reload();
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {showEditModal && selectedDepartment && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Department</label>
                  <select
                    value={selectedDepartment.department_id || ""}
                    className="border p-2 w-full rounded"
                    onChange={(e) =>
                      setSelectedDepartment({
                        ...selectedDepartment, // Spread the current state
                        department_id: e.target.value,
                      })
                    }
                  >
                    <option>Select Department</option>
                    {departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.department_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Category Name</label>
                  <input
                    type="text"
                    value={selectedDepartment.category_name || ""}
                    onChange={(e) =>
                      setSelectedDepartment({
                        ...selectedDepartment,
                        category_name: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Short Name</label>
                  <input
                    type="text"
                    value={selectedDepartment.category_short_name || ""}
                    onChange={(e) =>
                      setSelectedDepartment({
                        ...selectedDepartment,
                        category_short_name: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={selectedDepartment.category_image_url || ""}
                    onChange={(e) =>
                      setSelectedDepartment({
                        ...selectedDepartment,
                        category_image_url: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded"
                    required
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDepartment.is_active === "YES"}
                    onChange={() =>
                      setSelectedDepartment({
                        ...selectedDepartment,
                        is_active:
                          selectedDepartment.is_active === "YES" ? "NO" : "YES",
                      })
                    }
                    className="mr-2"
                  />
                  <label className="text-gray-700">Is Active</label>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {successEditModal && (
          <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-4">
                  Successfully Updated!
                </h3>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                    onClick={() => {
                      setSuccessEditModal(false);
                      window.location.reload();
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
