import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle non-string insert correctly', () => {
    const delta = new Delta();
    expect(() => delta.insert({})).toThrowError('cannot retain a [object Object]');
    delta.insert('test');
    expect(delta.ops.length).toBe(1);
    expect(() => delta.insert({})).toThrowError('cannot retain a [object Object]');
  });
});