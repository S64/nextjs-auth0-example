import NextApp, { AppProps } from 'next/app'
import '../styles/globals.css'
import { UserProvider, } from '../user';

export default class MyApp extends NextApp<AppProps> {
  render(): JSX.Element {
    const { pageProps, Component } = this.props

    return <UserProvider>
      <Component {...pageProps}/>
    </UserProvider>
  }
}
