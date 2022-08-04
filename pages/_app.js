import { Layout } from '../components/Sections/Layout';
import AdminLayout  from '../components/Admin/Layout';
import { useRouter } from 'next/router';
import store from '../redux/store'
import { Provider } from 'react-redux'
import '../styles/scss/style.scss'

import 'swiper/css';
import 'swiper/css/navigation';


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  if (router.pathname.startsWith("/admin")) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    )
  }
  return (
    <Provider store={store}>
       <Layout>
         <Component {...pageProps} />
       </Layout>
    </Provider>
  );
  
}


export default MyApp