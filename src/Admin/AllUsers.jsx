import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchUsers = () => {
    axios
      .get(`http://localhost:3000/users${filter ? `?status=${filter}` : ""}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Fetch users error:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleStatusChange = (id, action) => {
    let url;
    if (action === "block") url = `/users/block/${id}`;
    if (action === "unblock") url = `/users/unblock/${id}`;
    if (action === "make-volunteer") url = `/users/make-volunteer/${id}`;
    if (action === "make-admin") url = `/users/make-admin/${id}`;

    axios
      .patch(`http://localhost:3000${url}`)
      .then(() => {
        Swal.fire("Success", "Action performed successfully", "success");
        fetchUsers();
      })
      .catch(() => Swal.fire("Error", "Action failed", "error"));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <table className="table w-full border border-[#b71b1c]">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <img
                  src={u.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                  }}
                />
              </td>
              <td>{u.email}</td>
              <td>{u.name || u.displayName || "-"}</td>
              <td>{u.role}</td>
              <td className="capitalize">{u.status}</td>
              <td>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="p-1 rounded hover:bg-gray-100">
                    <BsThreeDotsVertical size={20} />
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md z-10">
                    <div className="flex flex-col p-1">
                      {/* Block / Unblock */}
                      {u.status === "active" && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleStatusChange(u._id, "block")}
                              className={`p-2 w-full text-left rounded ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              Block
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      {u.status === "blocked" && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                handleStatusChange(u._id, "unblock")
                              }
                              className={`p-2 w-full text-left rounded ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              Unblock
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {u.role === "donor" && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                handleStatusChange(u._id, "make-volunteer")
                              }
                              className={`p-2 w-full text-left rounded ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              Make Volunteer
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {(u.role === "donor" || u.role === "volunteer") && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                handleStatusChange(u._id, "make-admin")
                              }
                              className={`p-2 w-full text-left rounded ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              Make Admin
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
