import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module.exports', () => {
  it('should be importable as a CommonJS module with module.exports set correctly', () => {
    // In Node.js/Jest environment, typeof module === 'object', so the original code
    // sets module.exports = Delta. The mutation changes the condition to
    // typeof module === "" which is always false, preventing module.exports assignment.
    // We verify this by requiring the built/compiled module and checking it works as a constructor.
    const DeltaRequired = require('../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    
    // The default export should be the Delta class
    // With the mutation, module.exports is never set, so require() returns an empty object
    // or the module's internal exports (which may not have the Delta constructor directly)
    
    // In the original code: module.exports = Delta, so DeltaRequired should be the Delta class
    // In the mutated code: module.exports is never set, so DeltaRequired.default would be Delta
    // but DeltaRequired itself would not be the Delta constructor
    
    // Check that the required module itself is a constructor that creates Delta instances
    const instance = new DeltaRequired();
    expect(instance).toBeInstanceOf(Delta);
    expect(Array.isArray(instance.ops)).toBe(true);
    expect(instance.ops.length).toBe(0);
  });
});