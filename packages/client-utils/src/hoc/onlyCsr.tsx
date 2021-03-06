// 通过使用该HOC使得组件只在客户端进行渲染
import * as React from 'react'

interface State {
  isClient: boolean
}

function onlyCsr (WrappedComponent: React.FC): React.ComponentClass {
  class OnlyCsrClass extends React.Component<any, State> {
    constructor (props: any) {
      super(props)
      this.state = {
        isClient: false
      }
    }

    componentDidMount () {
      this.setState({
        isClient: true
      })
    }

    render () {
      return this.state.isClient ? <WrappedComponent {...this.props}></WrappedComponent> : <div></div>
    }
  }
  for (const key in WrappedComponent) {
    // 静态属性传递
    // @ts-ignore for this issue https://github.com/Microsoft/TypeScript/issues/6480
    OnlyCsrClass[key] = WrappedComponent[key]
  }
  return OnlyCsrClass
}

export {
  onlyCsr
}
