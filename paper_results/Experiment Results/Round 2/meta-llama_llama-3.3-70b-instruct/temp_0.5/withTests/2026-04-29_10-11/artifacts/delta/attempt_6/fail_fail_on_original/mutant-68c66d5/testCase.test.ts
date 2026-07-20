import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check module export', () => {
    if (typeof module === 'object') {
      expect(module.exports).toBeDefined();
      expect(module.exports.default).toBeDefined();
    }
  });
});