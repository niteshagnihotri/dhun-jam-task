import axios from "axios";
import Cookie from 'js-cookie'

export async function loginUser(data) {
  try {
    const res = await axios.post("https://stg.dhunjam.in/account/admin/login", {
      username: data.username,
      password: data.password,
    });
    const response = res.data.data;
    if(response?.id){
      Cookie.set('id', response.id);
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to Login!");
  }
}

export async function updatePrice(data){
  try{
    let id = Cookie.get('id');
    const res = await axios.put(`https://stg.dhunjam.in/account/admin/${id}`, data);
    return res;
  }
  catch(error){
    console.log(error);
    throw new Error('Failed to Update Price');
  }
}