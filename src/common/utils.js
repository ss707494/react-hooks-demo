
export const omit = (obj, prop) => {
  const {[prop]: omit, ...rest} = obj
  return rest
}
