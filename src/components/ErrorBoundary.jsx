import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    /* decorative content failed — render the fallback silently */
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}