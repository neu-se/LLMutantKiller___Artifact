import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should handle identical ops array reference', () => {
    const ops = [{ insert: 'test' }];
    const a = new Delta(ops);
    const b = new Delta(ops);
    const result = a.diff(b);
    expect(result.ops).toEqual([]);
  });
});