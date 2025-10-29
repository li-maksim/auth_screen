import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import LoginForm from "./LoginForm"

const queryClient = new QueryClient()

function LoginScreen() {

    return (
        <QueryClientProvider client={queryClient}>
            <LoginForm />
        </QueryClientProvider>
    )
}

export default LoginScreen