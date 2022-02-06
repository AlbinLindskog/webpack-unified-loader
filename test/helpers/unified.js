export function parserPlugin(options) {

  const parser = () => {
    return {type: 'delta'}
  }

  Object.assign(this, {Parser: parser})
}


export function compilerPlugin(options) {

  const compiler = () => {
    return "test-string"
  }

  Object.assign(this, {Compiler: compiler})
}


export function compilerPluginWithError(options) {

  const compiler = () => {
    throw new Error('Whoops!')
  }

  Object.assign(this, {Compiler: compiler})
}