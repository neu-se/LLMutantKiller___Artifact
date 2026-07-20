import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle conditional module export', () => {
    const condition = typeof module === 'object';
    expect(condition).toBeTruthy();
    expect(condition).not.toBe(true === true);
  });
});