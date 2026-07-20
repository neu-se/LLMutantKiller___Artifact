import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('module.exports should be the Delta constructor function itself, not a plain object', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    
    // In the original: module.exports = Delta (a class/function)
    // So typeof required === 'function'
    //
    // In the mutated code (if (false)):
    // module.exports is never reassigned to Delta
    // The TypeScript compiled output leaves module.exports as the exports object
    // which is a plain object, not a function
    
    expect(typeof required).toBe('function');
  });
});