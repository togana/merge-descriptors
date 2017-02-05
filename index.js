function merge(dest, src, redefine = true) {
  if (!dest) throw new TypeError('dist is unexpected argument.');
  if (!src) throw new TypeError('src is unexpected argument.');

  Object.getOwnPropertyNames(src)
    .filter(name => redefine || !(name in dest))
    .map(name => Object.defineProperty(dest, name, Object.getOwnPropertyDescriptor(src, name)));

  return dest;
}

module.exports = merge;
