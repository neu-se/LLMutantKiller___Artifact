import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    expect(typeof Delta).toBe('function');
    const delta = new Delta();
    expect(delta instanceof Delta).toBe(true);
  });
});