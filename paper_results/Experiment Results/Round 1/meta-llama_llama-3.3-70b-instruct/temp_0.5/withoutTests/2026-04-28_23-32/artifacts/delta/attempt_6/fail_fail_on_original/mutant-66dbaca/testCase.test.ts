import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should be able to use the Delta class after requiring it as a module', () => {
    const module = require('../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBeDefined();
    const delta = new module.exports.default();
    expect(delta).toBeInstanceOf(module.exports.default);
  });
});