import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should export correctly as a module', () => {
    const module = require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(module).toHaveProperty('default');
    expect(module.default).toBeInstanceOf(Function);
  });
});