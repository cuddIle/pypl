import { authHandler } from "@/app/api/auth/[...nextauth]/route"; // adjust path as needed
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await getServerSession(authHandler);

  if (session) {
    redirect("/overview");
  } else {
    redirect("/login");
  }

  return <></>;
}