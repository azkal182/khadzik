import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { signIn } from "@/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignIn() {
  // const {register, handleSubmit} = useForm<z.infer<typeof LoginSchema>>({
  //     resolver:zodResolver(LoginSchema)
  // })

  // const onSubmit = async (values:<typeof LoginSchema>) => {

  // }
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirectTo: "/dashboard"
        });
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="email"
            required
            className="w-full"
          />
          <Badge>✔</Badge>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="w-full"
          />
          <Badge>✔</Badge>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
