import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check if module is defined', () => {
    if (typeof module === 'object' && module.exports) {
      expect(module.exports.default).toBe(Delta);
    } else {
      throw new Error('Module is not defined');
    }
  });
});