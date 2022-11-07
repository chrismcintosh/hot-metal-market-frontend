import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import 'tailwindcss/tailwind.css'
import { AppContextProvider } from "@/lib/AppContext";


const App = ({ Component, pageProps }) => {
    const [queryClient] = React.useState(() => new QueryClient());
    return(
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <Component {...pageProps} />
          </AppContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
}

export default App
