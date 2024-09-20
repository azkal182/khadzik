import "next-auth";

declare module "next-auth" {
  interface User {
    id: string | undefined;
  }

  interface Session {
    user?: User;
  }
}

// declare module '@auth/core/jwt' {
//     interface JWT {
//         username: string;
//         role: string;
//         type: string
//     }
// }
