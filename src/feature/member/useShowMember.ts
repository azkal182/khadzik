import axios from "@/lib/axios";
import { useQuery } from "react-query";

const useShowMember = (id: number) => {
  return useQuery({
    queryKey: ["member-show", id],
    queryFn: async () => {
      const memberResponse = await axios.get("/api/members/" + id);

      return memberResponse.data;
    }
  });
};

export default useShowMember;
