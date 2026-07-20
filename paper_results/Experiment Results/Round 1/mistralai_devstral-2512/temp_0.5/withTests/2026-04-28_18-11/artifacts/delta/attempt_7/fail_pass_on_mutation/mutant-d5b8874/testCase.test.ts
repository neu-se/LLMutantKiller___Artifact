import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with embed retain', () => {
  it('should handle embed retain with null correctly', () => {
    const a = new Delta().retain({ embed: null });
    const b = new Delta().delete(1);
    const result = a.compose(b);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toEqual({ delete: 1 });
  });
});