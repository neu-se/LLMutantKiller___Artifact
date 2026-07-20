import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('should have Op accessible directly on the required module (not just on .default)', () => {
    const modulePath = require.resolve('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    delete require.cache[modulePath];
    
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // In original: module.exports = Delta (the class itself)
    // Delta.Op is a static property, so required.Op === Delta.Op
    //
    // In mutated: module.exports is the TS exports namespace object
    // The namespace has { default: Delta, Op: Op, OpIterator, AttributeMap }
    // So required.Op would be Op (the standalone export), not Delta.Op
    // But required itself would NOT be the Delta constructor
    // So required.prototype would be undefined in mutated (plain object, not a class)
    
    expect(required.prototype).toBeDefined();
    expect(typeof required.prototype.compose).toBe('function');
  });
});