import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed retain', () => {
  it('should handle null retain object correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().delete(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([]);
  });
});