describe('Delta module export', () => {
  it('require of Delta module should return Delta constructor directly allowing direct instantiation', () => {
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // Original: module.exports = Delta, so required IS Delta constructor
    // Mutated: module.exports not set, so required is TS module object with .default property
    // Key difference: in original, required.default === required (both are Delta)
    // In mutated: required.default !== required (required is module object, .default is Delta)
    
    expect(required).toBe(required.default);
  });
});