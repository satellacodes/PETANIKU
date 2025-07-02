import React from "react";

export default function Notification({ message }) {
  return message ? (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-md animate-bounce">
      {message}
    </div>
  ) : null;
}
