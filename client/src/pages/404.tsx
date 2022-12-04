import Link from 'next/link'

const NotFound = () => {
    return (
        <>
            <div className="flex flex-col items-center">
            <h1 className="mt-10 mb-4 text-5xl text-gray-800">Page Not Found</h1>
                <Link href="/" className="px-4 py-2 blue button">
                    Home
                </Link>
            </div>
        </>
    )
}

export default NotFound