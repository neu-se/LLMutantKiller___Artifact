import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('required module should be the Delta constructor with static Op property', () => {
    // Original: module.exports = Delta runs (typeof module === 'object' is true in Node.js)
    // Mutated:  module.exports = Delta is skipped (condition inverted)
    //
    // With original: require() returns Delta directly → has static properties like Delta.Op
    // With mutated:  require() returns exports namespace → does NOT have Delta.Op directly

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // Delta.Op is a static property on the Delta class itself
    // In original: required.Op === Delta.Op (since required IS Delta)
    // In mutated:  required.Op is undefined (required is { default: Delta }, not Delta)
    expect(required.Op).toBeDefined();
    expect(required.Op).toBe(Delta.Op);
  });
});