import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should have module exports available in Node.js environment', () => {
    // This test verifies the module export behavior which is affected by the mutation
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module === ""`
    // This will cause the module export to fail in Node.js environments where module is an object
    expect(typeof module).toBe('object');
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBe(Delta);
  });
});