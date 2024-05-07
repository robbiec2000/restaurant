"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

type Props = { id: string };

export const DeleteButton = ({ id }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (
    status === "loading" ||
    status === "unauthenticated" ||
    !session?.user.isAdmin
  ) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      router.push("/menu");
      toast.success("The product has been deleted");
    }else{
      const data = await res.json();
      toast.error(data.message);
    }
  };

  return (
    <button className="bg-red-400 p-2 rounded-full absolute top-4 right-4" onClick={handleDelete}>
      <MdOutlineDeleteOutline
        style={{ color: "white", fontSize: 30 }}
      />
    </button>
  );
};
