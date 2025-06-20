import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

export default async function Page() {
    const { userId } = await auth();

    if (userId) {
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <SignIn />
            </div>
        </div>
    )
}