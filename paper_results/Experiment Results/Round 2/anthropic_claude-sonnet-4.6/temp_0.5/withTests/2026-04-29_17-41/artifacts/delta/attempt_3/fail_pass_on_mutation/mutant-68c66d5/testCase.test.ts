import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('should set module.exports to Delta so that require() returns the Delta constructor itself', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    
    // In the original code: module.exports = Delta
    // So require() should return the Delta constructor directly (not a wrapper object)
    // In the mutated code: if (false) means module.exports is never set to Delta
    // So require() returns the module namespace, not the constructor itself
    
    // The original sets module.exports = Delta, so required itself should be callable as a constructor
    const instance = new required();
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([]);
  });
});