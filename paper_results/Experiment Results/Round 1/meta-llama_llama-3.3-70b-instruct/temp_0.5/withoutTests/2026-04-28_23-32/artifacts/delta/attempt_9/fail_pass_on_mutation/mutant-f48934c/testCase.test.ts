import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle empty string insert correctly', () => {
    const delta = new Delta();
    delta.insert('');
    expect(delta.ops.length).toBe(0);
    delta.insert('test');
    expect(delta.ops.length).toBe(1);
    delta.insert('');
    expect(delta.ops.length).toBe(1);
    const delta2 = new Delta();
    delta2.insert('test');
    expect(delta2.ops.length).toBe(1);
    delta2.insert('');
    expect(delta2.ops.length).toBe(1);
    expect(delta2.ops[0].insert).toBe('test');
    const delta3 = new Delta();
    delta3.insert('');
    expect(delta3.ops.length).toBe(0);
    delta3.insert('');
    expect(delta3.ops.length).toBe(0);
  });
});