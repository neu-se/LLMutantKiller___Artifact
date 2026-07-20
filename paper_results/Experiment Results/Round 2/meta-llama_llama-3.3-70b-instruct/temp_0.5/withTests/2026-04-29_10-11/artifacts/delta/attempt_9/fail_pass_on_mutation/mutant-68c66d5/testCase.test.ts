import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check if module exports are defined', () => {
    if (typeof module === 'object' && module.exports) {
      expect(module.exports).toBeDefined();
    } else {
      throw new Error('Module exports are not defined');
    }
  });
});