import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should be a function when imported with require', () => {
    const delta = require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(delta).toHaveProperty('default');
    expect(delta.default).toBeInstanceOf(Function);
  });
});