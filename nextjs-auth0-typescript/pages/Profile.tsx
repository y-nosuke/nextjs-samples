import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(isLoading);
  console.log(error);
  console.log(user);

  if (user) {
    return (
      <div>
        <Image
          src={user.picture as string}
          alt={user.name as string}
          width={"200px"}
          height={"100px"}
        />
        <h2>Welcome {user.name}!</h2>
        <p>{user.email}</p>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
