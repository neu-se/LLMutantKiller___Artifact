import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain a non-positive length', () => {
    const delta = new Delta();
    const originalLength = delta.length();
    delta.retain(0);
    expect(delta.length()).toBe(originalLength);
    delta.retain(-1);
    expect(delta.length()).toBe(originalLength);
    expect(() => delta.retain(-1)).not.toThrowError('no handlers for embed type');
    expect(delta.ops).toEqual([]);
  });
});