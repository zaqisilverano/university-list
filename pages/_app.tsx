import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/navbar/navbar'

function UniversityApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default UniversityApp
