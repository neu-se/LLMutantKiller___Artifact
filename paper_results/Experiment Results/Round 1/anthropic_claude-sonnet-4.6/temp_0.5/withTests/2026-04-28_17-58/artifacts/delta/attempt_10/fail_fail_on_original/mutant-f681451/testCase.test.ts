import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('delete + retain interaction where thisOp delete cancels otherOp retain', () => {
    const a = new Delta().retain(1).delete(1);
    const b = new Delta().retain(2, { bold: true });
    const expected = new Delta().retain(1);
    expect(a.transform(b, false)).toEqual(expected);
  });
});