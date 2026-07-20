import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('Delta class should have Op as a static property accessible via require', () => {
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // With original: module.exports = Delta, so required.Op is Delta.Op (static class property)
    // With mutated: required is TS module object, required.Op is the named export Op
    // The named export Op and Delta.Op are the same object, BUT:
    // In original: required === Delta (the class itself)
    // In mutated: required !== Delta

    // If required IS Delta, then required === Delta imported via ES modules
    expect(required).toBe(Delta);
  });
});