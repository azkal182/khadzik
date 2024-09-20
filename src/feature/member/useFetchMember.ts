import axios from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";

const useFetchMember = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios("/api/members");
      return response;
    }
  });
};

export default useFetchMember;
