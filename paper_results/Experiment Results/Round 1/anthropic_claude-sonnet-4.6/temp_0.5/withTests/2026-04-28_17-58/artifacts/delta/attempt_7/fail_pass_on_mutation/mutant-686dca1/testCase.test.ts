describe('Delta CommonJS module export', () => {
  it('should correctly export Delta so that the module default export equals the Delta class used in the module', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // Get Delta from the default export path
    const DeltaClass = required.default ?? required;

    // Create an instance and verify it's a proper Delta
    const delta = new DeltaClass().insert('hello');
    
    // Original: module.exports = Delta runs, module.exports.default = Delta
    // The static registerEmbed should be available on the required module directly
    // Mutated: block skipped, so module.exports is the ts compiled exports object
    
    // In original: required is Delta function, required.registerEmbed is Delta.registerEmbed
    // In mutated: required is {default: Delta}, required.registerEmbed is undefined
    expect(typeof required.registerEmbed).toBe('function');
  });
});