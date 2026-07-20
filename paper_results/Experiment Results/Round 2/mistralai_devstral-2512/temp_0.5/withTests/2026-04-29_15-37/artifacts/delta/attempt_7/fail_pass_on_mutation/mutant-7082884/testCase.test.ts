import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should optimize when ops arrays are identical references', () => {
    const ops = [{ insert: 'A' }, { insert: 'B', attributes: { bold: true } }];
    const a = new Delta(ops);
    const b = new Delta(ops);
    const result = a.diff(b);
    expect(result.ops).toEqual([]);
  });
});