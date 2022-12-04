import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html lang="en">
            <Head>
            <link rel="icon" type="image/x-icon" href="/reddit.svg" />
            <meta charSet="utf-8" />
                
                <meta property="og:site_name" content="reddit" />
                {/* <meta property="twitter:site" content="@readit" /> */}
                <meta property="twitter:card" content="summary" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content={`http://localhost:3000/reddit.svg`}
                />
                <meta
                    property="twitter:image"
                    content={`http://localhost:3000/reddit.svg`}
                />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600&display=swap"
                    rel="stylesheet"
                />
                <link 
                    rel="stylesheet" 
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" 
                    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" 
                    crossOrigin="anonymous" 
                />
            </Head>
            <body className="font-body" style={{ backgroundColor: '#DAE0E6' }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
export default Document
