// import {useEffect, useState} from 'react';
import {getUser} from './checkUserGetEmail.js';
import Cookies from 'js-cookie';
const useFetchUser = async () => {
  const token = Cookies.get("userToken");
  console.log("token from hook is");
  console.log(token);
  const fetchedUser = await getUser(token);
  // const [user,setUser] = useState(null);
  // useEffect(()=>{
  //   async function fetchUser() {
  //     const token = Cookies.get("userToken");
  //     const fetchedUser = await getUser(token);
  //     setUser(fetchedUser);
  //   } 
  //   fetchUser();
  //  },[]
  // );
  return fetchedUser;
 }

 export default useFetchUser;