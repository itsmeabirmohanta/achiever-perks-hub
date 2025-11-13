import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseConfig = {
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@supabase/supabase-js',
        'react-router-dom',
        '@tanstack/react-query',
      ],
    },
    define: {
      __PERFORMANCE_MONITORING__: mode === 'production',
      __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
  };

  if (mode === 'development') {
    return {
      ...baseConfig,
      server: {
        host: "::",
        port: 8080,
        cors: true,
        hmr: {
          overlay: true,
        },
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        }
      },
    };
  }

  // Production configuration
  return {
    ...baseConfig,
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select',
              '@radix-ui/react-toast',
            ],
            'supabase-vendor': ['@supabase/supabase-js'],
            'utils-vendor': ['clsx', 'tailwind-merge', 'date-fns'],
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
  };
});
