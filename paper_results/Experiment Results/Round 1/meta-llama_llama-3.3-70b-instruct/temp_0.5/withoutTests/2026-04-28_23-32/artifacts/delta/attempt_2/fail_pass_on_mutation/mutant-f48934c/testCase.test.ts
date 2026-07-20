import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle empty string correctly', () => {
    const delta = new Delta();
    delta.insert('');
    expect(delta.ops.length).toBe(0);
    delta.insert('test');
    expect(delta.ops.length).toBe(1);
    delta.insert('');
    expect(delta.ops.length).toBe(1);
  });
});