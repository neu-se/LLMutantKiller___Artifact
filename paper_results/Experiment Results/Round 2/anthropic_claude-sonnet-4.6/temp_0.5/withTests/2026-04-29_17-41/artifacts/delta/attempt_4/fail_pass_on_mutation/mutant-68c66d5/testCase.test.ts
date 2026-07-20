import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('should set module.exports.default to the same value as module.exports', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    
    // In the original code:
    //   module.exports = Delta        => required === Delta
    //   module.exports.default = Delta => required.default === Delta
    // So required === required.default
    //
    // In the mutated code (if (false)):
    //   module.exports is never set to Delta
    //   required is the module namespace object (not Delta itself)
    //   required.default is Delta
    // So required !== required.default
    
    expect(required).toBe(required.default);
  });
});