import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Check if error is from an external browser extension (MetaMask, etc.)
    const msg = error?.message || '';
    const stack = error?.stack || '';
    const text = (msg + ' ' + stack).toLowerCase();

    if (
      text.includes('chrome-extension://') ||
      text.includes('metamask') ||
      text.includes('inpage.js') ||
      text.includes('ethereum')
    ) {
      // Ignore extension errors
      return { hasError: false, error: null };
    }

    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const msg = error?.message || '';
    const text = (msg + ' ' + (error?.stack || '')).toLowerCase();

    if (
      text.includes('chrome-extension://') ||
      text.includes('metamask') ||
      text.includes('inpage.js') ||
      text.includes('ethereum')
    ) {
      return;
    }

    console.error('Uncaught application error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FCFAF6] flex items-center justify-center p-6 text-[#151A18]">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#E0DDD5] p-8 shadow-xl text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div>
              <h2 className="font-heading font-extrabold text-2xl text-[#151A18]">
                Something went wrong
              </h2>
              <p className="text-xs text-[#55625B] mt-2 leading-relaxed">
                An unexpected interface issue occurred. You can reload the page or return to the Genius Dairy Farms homepage.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF8F3] hover:bg-[#EAE6DC] text-[#143727] text-xs font-bold transition-all border border-[#E0DDD5] cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#143727] hover:bg-[#0D261B] text-[#C89D4B] text-xs font-extrabold transition-all shadow-md cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
