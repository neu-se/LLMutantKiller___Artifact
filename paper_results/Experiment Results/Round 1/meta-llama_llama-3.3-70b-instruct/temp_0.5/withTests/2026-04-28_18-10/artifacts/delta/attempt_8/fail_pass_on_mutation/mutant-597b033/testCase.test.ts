import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle conditional module export', () => {
    const condition = typeof module === 'object';
    if (condition) {
      expect(condition).toBe(true);
    } else {
      expect(module).toBeUndefined();
    }
    expect(typeof module).not.toBe('boolean');
  });
});