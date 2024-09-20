import axios from "@/lib/axios";
import { useMutation, useQuery } from "react-query";

const useUpdateMember = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const memberResponse = await axios.patch("/api/members/" + body.id, body);

      return memberResponse.data;
    },
    onSuccess
  });
};

export default useUpdateMember;
