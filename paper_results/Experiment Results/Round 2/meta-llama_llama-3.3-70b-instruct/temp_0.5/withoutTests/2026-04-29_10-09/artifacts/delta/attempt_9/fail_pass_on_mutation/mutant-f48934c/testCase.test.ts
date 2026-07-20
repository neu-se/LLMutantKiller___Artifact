import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle empty string insert correctly', () => {
    const delta = new Delta();
    delta.insert('');
    const delta2 = new Delta();
    delta2.insert('a');
    expect(delta.ops.length).not.toBe(delta2.ops.length);
  });
});