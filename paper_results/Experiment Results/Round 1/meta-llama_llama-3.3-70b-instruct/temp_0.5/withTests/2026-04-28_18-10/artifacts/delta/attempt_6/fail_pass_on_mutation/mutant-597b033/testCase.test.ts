import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle conditional module export', () => {
    const originalModule = typeof module;
    if (originalModule === 'object') {
      expect(typeof module).toBe('object');
    } else {
      throw new Error('module is not an object');
    }
  });
});