import React from 'react';
import {getUser} from '../../hooks/checkUserGetEmail.js';



export async function getServerSideProps(ctx) {
  const token = ctx.req.headers.cookie;
  console.log("token from userChecker is");
  console.log(token);
  const user = await getUser(token);
  return{props:{user}}
}

const UserChecker = ({ Component, pageProps, user }) => {
  return <Component {...pageProps} user={user} />;
};


export default UserChecker;