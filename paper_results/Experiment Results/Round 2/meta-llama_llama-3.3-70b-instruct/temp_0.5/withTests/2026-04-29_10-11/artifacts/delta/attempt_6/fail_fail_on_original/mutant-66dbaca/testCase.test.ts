import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should have correct exports', () => {
    const module = require('../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(module).toBeDefined();
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBeDefined();
    expect(module.exports).toEqual({ default: Delta });
  });
});