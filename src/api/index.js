const files = require.context('./', true, /^\.\/(?!index).*\.js$/i)

export default files.keys().reduce((i, e) => {
  Object.keys(files(e)).forEach(e1 => {
    if (i[e1]) {
      throw new Error(`${e1} api名称存在，为避免冲突请更换名称`)
    }
  })
  return {
    ...i,
    ...files(e),
  }
}, {})
