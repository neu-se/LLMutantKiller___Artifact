import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should export correctly as a module', () => {
    const module = require../../../../../../../../../../../subject_repositories/delta/src/Delta';
    expect(typeof module).toBe('object');
    expect(module.default).toBeInstanceOf(Function);
    expect(module).toHaveProperty('default');
  });
});