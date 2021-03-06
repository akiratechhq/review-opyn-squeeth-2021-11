import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import Head from 'next/head'
import React from 'react'

import { useWallet, WalletProvider } from '../src/context/wallet'
import { WorldProvider } from '../src/context/world'
import getTheme, { Mode } from '../src/theme'
import { uniswapClient } from '../src/utils/apollo-client'

function MyApp({ Component, pageProps }: any) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])
  return (
    <WalletProvider>
      <TradeApp Component={Component} pageProps={pageProps} />
    </WalletProvider>
  )
}

const TradeApp = ({ Component, pageProps }: any) => {
  const { networkId } = useWallet()

  return (
    <React.Fragment>
      <Head>
        <title>Squeeth</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={uniswapClient[networkId] || uniswapClient[1]}>
        <ThemeProvider theme={getTheme(Mode.DARK)}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <WorldProvider>
            <Component {...pageProps} />
          </WorldProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  )
}

export default MyApp
