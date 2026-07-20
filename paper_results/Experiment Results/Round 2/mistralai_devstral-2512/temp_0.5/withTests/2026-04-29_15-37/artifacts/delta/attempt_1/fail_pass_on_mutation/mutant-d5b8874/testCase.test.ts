import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed retain', () => {
  it('should not push delete when thisOp.retain is null', () => {
    const a = new Delta().retain(1, { bold: true });
    const b = new Delta().delete(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ delete: 1 }]);
  });
});