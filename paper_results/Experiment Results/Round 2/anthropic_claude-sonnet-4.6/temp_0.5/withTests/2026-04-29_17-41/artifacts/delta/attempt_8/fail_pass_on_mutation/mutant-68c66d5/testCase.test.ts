import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export condition', () => {
  it('typeof module should be object, meaning the CJS export block executes', () => {
    // The mutation changes `if (typeof module === 'object')` to `if (false)`
    // In Node.js, typeof module === 'object' is always true
    // We can verify this condition holds, which means the original code's
    // module.exports = Delta block SHOULD execute
    // If it does execute, then the Delta default import should equal
    // what module.exports was set to
    
    // In original: module.exports = Delta AND module.exports.default = Delta
    // This means the default import IS the same object as module.exports
    // AND module.exports.default is also set to Delta
    
    // The distinguishing observable: in original code, Delta === Delta.default
    // because module.exports = Delta sets it, then module.exports.default = Delta
    // adds .default property pointing back to itself
    
    expect((Delta as any).default).toBe(Delta);
  });
});