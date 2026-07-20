import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('named exports Op and OpIterator should be accessible via require', () => {
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    
    // With original code: module.exports = Delta (a function), then module.exports.default = Delta
    // So required is the Delta function itself, and required.Op, required.OpIterator etc
    // come from Delta's static properties
    // With mutated code: required is the TS exports object which has
    // { default: Delta, Op: Op, OpIterator: OpIterator, AttributeMap: AttributeMap }
    // So required.Op would be the Op class directly
    
    // In original: required.Op === Delta.Op (static property on Delta class)
    // In mutated: required.Op === Op (named export, same thing but accessed differently)
    // The difference: in original required itself IS Delta
    // In mutated required is NOT Delta
    
    // Check that required is actually the Delta constructor (not a module object)
    const instance = new required({ ops: [{ insert: 'test' }] });
    expect(instance.ops).toEqual([{ insert: 'test' }]);
  });
});