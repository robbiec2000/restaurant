"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`http://localhost:3000/api/confirm/${paymentIntent}`, {
          method: "PUT",
        });
        router.push("/orders");
      } catch (e) {
        console.log(e);
      }
    };
    makeRequest();
  }, [paymentIntent, router]);

  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page.
    </div>
  );
};

export default SuccessPage;
