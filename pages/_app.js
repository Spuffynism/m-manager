import 'cross-fetch/polyfill'
import NextApp from 'next/app';
import Head from 'next/head';
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import translations from '@shopify/polaris/locales/en.json';
import Cookies from 'js-cookie';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '@shopify/polaris/styles.css';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    const config = {
      apiKey: API_KEY,
      shopOrigin: Cookies.get('shopOrigin'),
      forceRedirect: false,
    };

    return (
      <React.Fragment>
        <Head>
          <title>Metafields manager</title>
          <meta charSet="utf-8"/>
        </Head>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps}/>
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    )
  }
}

export default App;