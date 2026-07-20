import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle empty string insert correctly', () => {
    const delta = new Delta();
    const initialOpsLength = delta.ops.length;
    delta.insert('');
    expect(delta.ops.length).toBe(initialOpsLength);
  });
});