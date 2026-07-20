import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('module.exports should equal Delta constructor directly, not a namespace wrapper', () => {
    // Original: if (typeof module === 'object') runs → module.exports = Delta
    // Mutated:  if (typeof module !== 'object') runs → block skipped in Node.js
    //
    // With original: require() returns Delta directly (a function with .default also set)
    // With mutated:  require() returns { default: Delta } namespace (module.exports.default !== module.exports)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // In original: required is Delta, so required === required.default
    // In mutated:  required is { default: Delta }, so required !== required.default
    expect(required).toBe(required.default);
  });
});