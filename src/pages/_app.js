import Layout from '../app/components/Layout';
import Nav from '../app/components/Nav';
import Footer from '../app/components/Footer';


export default function MyApp({Component,pageProps}){
  return(
    <Layout>
      <Nav/>
      <Component {...pageProps}/>
      <Footer/>
    </Layout>
  )
}