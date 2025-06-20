import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ClerkProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    theme="dark"
                />
                {children}
            </ClerkProvider>
        </>
    )
}