import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profil Saya</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-3xl">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mb-4 md:mb-0 md:mr-6" />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-600 capitalize">{user.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Informasi Pribadi</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Nama:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">No. HP:</span> {user.phone}
              </p>
              <p>
                <span className="font-medium">Peran:</span> {user.role}
              </p>
            </div>
          </div>

          {user.role === "farmer" && (
            <div>
              <h3 className="font-semibold mb-2">Informasi Petani</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Lokasi:</span> {user.location}
                </p>
                <p>
                  <span className="font-medium">Deskripsi:</span>{" "}
                  {user.description}
                </p>
              </div>
            </div>
          )}
        </div>

        <div>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
            Edit Profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
