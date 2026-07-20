import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should be able to require the module and check exports', () => {
    const module = require('../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    expect(module).toBeDefined();
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBeDefined();
  });
});