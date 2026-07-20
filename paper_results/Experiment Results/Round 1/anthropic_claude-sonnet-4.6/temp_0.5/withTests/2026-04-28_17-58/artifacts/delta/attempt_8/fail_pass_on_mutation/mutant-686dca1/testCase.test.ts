describe('Delta CommonJS module export', () => {
  it('module.exports should be the Delta constructor itself, not a wrapper with default property', () => {
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // Original: if (typeof module === 'object') runs → module.exports = Delta
    //           So required IS Delta, and required.default === Delta (set explicitly)
    //           required === required.default
    //
    // Mutated:  block skipped → module.exports remains as ts compiled exports
    //           exports.default = Delta (from TS compilation)
    //           required.default === Delta but required !== required.default
    //           required.default !== required

    // In original: required is Delta itself, so new required() creates a Delta
    // AND required.default is also Delta (set by module.exports.default = Delta)
    // So required === required.default

    // In mutated: required is the exports namespace object
    // required.default is Delta, but required !== required.default
    
    const isDirectlyDelta = required === required.default;
    expect(isDirectlyDelta).toBe(true);
  });
});