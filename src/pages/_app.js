// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports

import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'

import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, ...appProps } = props
  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta name='robots' content='index,follow' />
        <meta name='title' content='Sadek Filling Station' />
        <meta name='google-site-verification' content='OGUR6nifyf2unOD_ADhq83mk5Tq1lYJnWJE5zDe1sCk' />
        <meta
          content='Sadek Filling Station located at 32/A/18, Rayerbazar, Dhaka offers the safest services
  with a reasonable fuel price and enjoyable environment'
          name='description'
        />
        <meta
          content='gas,petrolpump,filling,station,sadekkhan,diesel,rayer-bazar,octane,bangladesh,dhaka,dhaka13,mohammadpur,mobil,bike,bus,car'
          name='keywords'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='http://www.sadekfillingstation.com' />
        <meta property='og:title' content='Sadek Filling Station' />
        <meta
          property='og:description'
          content='Sadek Filling Station located at 32/A/18, Rayerbazar, Dhaka offers the safest services
  with a reasonable fuel price and enjoyable environment'
        />
        <meta property='og:image' content='https://www.sadekfillingstation.com/slide-1.jpg' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='http://www.sadekfillingstation.com' />
        <meta property='twitter:title' content='Sadek Filling Station' />
        <meta
          property='twitter:description'
          content='Sadek Filling Station located at 32/A/18, Rayerbazar, Dhaka offers the safest services
with a reasonable fuel price and enjoyable environment'
        />
        <meta property='twitter:image' content='https://www.sadekfillingstation.com/slide-1.jpg'></meta>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <AuthProvider>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <WindowWrapper>
                    {[`/404`].includes(appProps.router.pathname) ? (
                      <> {getLayout(<Component {...pageProps} />)}</>
                    ) : (
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </Guard>
                    )}
                  </WindowWrapper>
                  <ReactHotToast>
                    <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                  </ReactHotToast>
                </ThemeComponent>
              )
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  )
}

export default App
