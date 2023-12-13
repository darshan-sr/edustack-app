"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    localStorage.clear();
    router.push("/");
  }
  return <div></div>;
};

export default page;
