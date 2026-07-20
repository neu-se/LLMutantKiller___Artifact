import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle null and empty string insert correctly', () => {
    const delta = new Delta();
    expect(() => delta.insert(null)).toThrowError('cannot retain a null');
    expect(() => delta.insert('')).not.toThrow();
    expect(delta.ops.length).toBe(0);
  });
});