const Delta = require('../../../../../../../../../subject_repositories/delta/src/Delta');

describe('Delta', () => {
  it('should be able to use the Delta class after requiring it as a module', () => {
    expect(Delta).toBeDefined();
    expect(Delta.default).toBeDefined();
    const delta = new Delta.default();
    expect(delta).toBeInstanceOf(Delta.default);
  });
});