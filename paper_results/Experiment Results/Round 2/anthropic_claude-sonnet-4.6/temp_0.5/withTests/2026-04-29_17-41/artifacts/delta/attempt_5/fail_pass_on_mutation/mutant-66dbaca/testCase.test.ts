import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('require() should return Delta constructor directly due to module.exports = Delta assignment', () => {
    // Original code: module.exports = Delta (overwrites exports object with Delta itself)
    // Mutated code: empty block, so module.exports stays as TS exports object
    // Therefore require() should return Delta directly, not an object with .default
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // With original: required IS the Delta constructor (module.exports = Delta)
    // With mutation: required is the TS exports object { default: Delta }, NOT Delta itself
    expect(required).toBe(Delta);
  });
});