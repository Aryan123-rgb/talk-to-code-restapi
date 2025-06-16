import { ClerkProvider } from "@clerk/nextjs";
<<<<<<< HEAD
import { ToastContainer } from "react-toastify";
=======
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ClerkProvider>
<<<<<<< HEAD
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    theme="dark"
                />
=======
>>>>>>> c77cfd2a013f58c7dd350a4aa707c6cfb5ccfcb7
                {children}
            </ClerkProvider>
        </>
    )
}