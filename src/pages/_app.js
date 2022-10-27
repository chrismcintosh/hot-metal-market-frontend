import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }) => {
    const [queryClient] = React.useState(() => new QueryClient());
    return(
        <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
}

export default App
