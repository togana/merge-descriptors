# merge-descriptors

[![CircleCI](https://circleci.com/gh/togana/merge-descriptors.svg?style=svg)](https://circleci.com/gh/togana/merge-descriptors)
[![codecov](https://codecov.io/gh/togana/merge-descriptors/branch/master/graph/badge.svg)](https://codecov.io/gh/togana/merge-descriptors)

Merge objects using descriptors

## Example

```js
const src = {
  get name() {
    return 'togana';
  }
};
const dest = {};
merge(dest, src);
// dest.name = 'togana'
```

## License

[MIT](LICENSE)
