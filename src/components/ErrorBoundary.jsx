import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[CS Odyssey] render error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-deep px-6 text-center">
          <p className="font-display text-2xl font-black text-gold">Something went wrong</p>
          <p className="max-w-lg text-sm text-slate-400">{String(this.state.error)}</p>
          <button
            onClick={() => this.setState({ error: null })}
            className="rounded-full border border-cyber/50 px-6 py-2 font-display text-xs font-bold tracking-widest text-cyber transition hover:bg-cyber hover:text-deep"
          >
            TRY AGAIN
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
