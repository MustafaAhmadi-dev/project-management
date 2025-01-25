import { User } from "@/types";
import Image from "next/image";
import React from "react";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/p1.jpeg`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>{user.userName}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
