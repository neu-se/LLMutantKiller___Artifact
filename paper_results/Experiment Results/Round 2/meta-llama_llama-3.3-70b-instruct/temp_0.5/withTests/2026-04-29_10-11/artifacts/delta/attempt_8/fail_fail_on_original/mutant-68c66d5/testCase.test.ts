import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check if module is defined', () => {
    if (typeof module === 'object' && module.exports) {
      expect(typeof module.exports).toBe('object');
      expect('default' in module.exports).toBe(true);
    } else {
      throw new Error('Module is not defined');
    }
  });
});