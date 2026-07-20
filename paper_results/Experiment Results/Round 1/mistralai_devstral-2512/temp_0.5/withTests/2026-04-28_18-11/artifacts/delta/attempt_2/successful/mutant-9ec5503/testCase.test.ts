import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with empty delta', () => {
  it('should handle empty delta composition correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta();
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }]);
  });
});