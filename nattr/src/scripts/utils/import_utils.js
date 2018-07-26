import React from 'react'

export function asyncComponent (getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null
    mounted = false
    state = { Component: AsyncComponent.Component }

    componentWillMount () {
      if (!this.state.Component) {
        const gotComponent = getComponent()
        gotComponent.then(Component => {
          AsyncComponent.Component = Component
          if (this.mounted) {
            this.setState({ Component })
          }
        })
      }
    }

    componentDidMount () {
      this.mounted = true
    }

    componentWillUnmount () {
      this.mounted = false
    }

    render () {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}
