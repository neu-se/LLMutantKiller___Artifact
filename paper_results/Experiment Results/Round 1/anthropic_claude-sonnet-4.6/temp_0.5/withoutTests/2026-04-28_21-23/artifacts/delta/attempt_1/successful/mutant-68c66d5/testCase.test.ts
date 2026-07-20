import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta CommonJS export', () => {
  it('should be exported as module.exports for CommonJS compatibility', () => {
    // Use require to test CommonJS export behavior
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    
    // In original code: module.exports = Delta, so required === Delta (the class itself)
    // In mutated code: module.exports is never set to Delta, so required is the ES module object
    // The original sets module.exports.default = Delta as well
    // So required should be the Delta constructor directly
    const instance = new required([ { insert: 'hello' } ]);
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([{ insert: 'hello' }]);
  });
});