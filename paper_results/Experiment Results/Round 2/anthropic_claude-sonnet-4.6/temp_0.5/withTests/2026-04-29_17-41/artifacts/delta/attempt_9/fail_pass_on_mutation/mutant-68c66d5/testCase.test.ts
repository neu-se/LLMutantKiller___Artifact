import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';
import { Op } from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('when module.exports is set to Delta, named exports like Op are only accessible as static properties', () => {
    const modulePath = require.resolve('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    delete require.cache[modulePath];
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // In original: module.exports = Delta (overwrites exports object)
    // So required.Op comes from Delta.Op (static property) = Op class
    // required.OpIterator comes from Delta.OpIterator (static) = OpIterator class
    
    // In mutated: module.exports is TS namespace { default: Delta, Op, OpIterator, AttributeMap }
    // required.Op is the named export Op (same as Delta.Op in this case)
    
    // The key difference: in original, required IS Delta, so required === Delta
    // In mutated, required is NOT Delta
    // Check: required.hasOwnProperty('default') should be false in original
    // (Delta class doesn't have own 'default' property before module.exports.default = Delta runs... 
    // wait, it does because module.exports.default = Delta sets it)
    
    // Actually in original: module.exports = Delta, then module.exports.default = Delta
    // So Delta.default = Delta (self-referential)
    // In mutated: the TS namespace object has .default = Delta but required !== Delta
    
    // Test: required.default should NOT equal required in mutated (namespace.default = Delta, namespace != Delta)
    // But in original: required = Delta, required.default = Delta, so required.default === required
    expect(required).toBe(required.default);
    // Additionally verify required.default is actually Delta
    expect(required.default).toBe(Delta);
  });
});