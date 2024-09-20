import axios from "@/lib/axios";
import { useMutation } from "react-query";

const useUpdateUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const userResponse = await axios.patch("/api/users/" + body.id, body);

      return userResponse.data;
    },
    onSuccess
  });
};

export default useUpdateUser;
