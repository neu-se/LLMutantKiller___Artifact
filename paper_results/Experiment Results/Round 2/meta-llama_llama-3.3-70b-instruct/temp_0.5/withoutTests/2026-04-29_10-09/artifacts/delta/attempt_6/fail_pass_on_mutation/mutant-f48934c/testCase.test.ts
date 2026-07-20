import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle empty string insert correctly', () => {
    const delta = new Delta();
    delta.insert('');
    delta.insert('a');
    delta.insert('');
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].insert).toBe('a');
  });
});