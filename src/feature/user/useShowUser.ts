import axios from "@/lib/axios";
import { useQuery } from "react-query";

const useShowUser = (id: number) => {
  return useQuery({
    queryKey: ["user-show", id],
    queryFn: async () => {
      const userResponse = await axios.get("/api/users/" + id);

      return userResponse.data;
    }
  });
};

export default useShowUser;
