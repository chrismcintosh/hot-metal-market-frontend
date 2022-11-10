import { useAuth } from "../hooks/auth"

export default function SamplePage() {
    
    const {logout} = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    return (
        <p>this is my sample page                     <button
        type="button"
        className="underline text-sm text-gray-600 hover:text-gray-900"
        onClick={logout}>
        Logout
    </button></p>
    )
}