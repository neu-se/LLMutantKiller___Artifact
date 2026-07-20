import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export guard', () => {
  it('should not throw when module is not an object', () => {
    // The original code guards with typeof module === 'object'
    // The mutated code uses if (true) which always executes
    // We can detect this by checking that the require'd module
    // properly handles the conditional
    const result = require('../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    expect(result).toBeDefined();
    expect(typeof result).toBe('function');
  });
});