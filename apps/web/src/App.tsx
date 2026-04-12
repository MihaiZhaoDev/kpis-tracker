import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UIProvider } from '@wsp/ui';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </UIProvider>
    </QueryClientProvider>
  );
}
