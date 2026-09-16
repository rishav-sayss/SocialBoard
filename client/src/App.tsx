import { ThemeProvider } from './features/theme/state/themeStore'
import { AuthProvider } from './features/auth/state/authStore'
import { PostProvider } from './features/posts/state/postStore'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PostProvider>
          <AppRoutes />
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
