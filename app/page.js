
import UserFormComponent from "@/components/home/userform.component";
import axios from "axios";
// import { getUserData } from "@/utils/admin-apis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserData() {
  try {
    const cookiesStore = cookies();
    const id = cookiesStore.get("id").value;
    const res = await axios.get(`https://stg.dhunjam.in/account/admin/${id}`);
    const response = await res.data.data;
    return response;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export default async function Home() {
  const data = await getUserData();
  if (!data) {
    redirect("/login");
  }
  return (
    <main>
      {!data && "No Data"}

      {data && <UserFormComponent defaultData={data} />}
      
    </main>
  );
}
