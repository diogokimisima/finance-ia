import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

const Home = async () => {
  const { userId } = await auth();
  console.log("userId", userId); // Adicione esse log para verificar o valor
  if (!userId) {
    redirect("/login");
  }
  return <Navbar />;
};

export default Home;
