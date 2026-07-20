import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('delete + retain in transform produces correct result with priority', () => {
    const a = new Delta().retain(1).delete(2);
    const b = new Delta().retain(1).retain(2, { bold: true });
    const expected = new Delta().retain(1);
    expect(a.transform(b, true)).toEqual(expected);
  });
});