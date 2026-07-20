describe('Delta CommonJS module export', () => {
  it('required module without .default should be directly instantiable as Delta', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // Original: module.exports = Delta → required is Delta constructor → new required() works
    // Mutated:  module.exports not set → required is { default: Delta } → new required() throws TypeError

    let instance: unknown;
    let error: unknown;
    try {
      instance = new required();
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
    expect(instance).toBeDefined();
    // The instance should have an ops array (Delta instance)
    expect((instance as { ops: unknown[] }).ops).toEqual([]);
  });
});