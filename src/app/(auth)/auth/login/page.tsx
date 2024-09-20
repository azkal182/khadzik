import { SignIn } from "@/components/sign-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Please enter your username and password to login.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 mb-4">
          <SignIn />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
