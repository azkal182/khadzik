import axios from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";

const useFetchProduct = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios("/api/products");
      return response;
    }
  });
};

export default useFetchProduct;
