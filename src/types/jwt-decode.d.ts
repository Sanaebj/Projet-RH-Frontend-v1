declare module "jwt-decode" {
    // T est le type du payload que tu veux récupérer
    export default function jwt_decode<T>(token: string): T;
  }
  