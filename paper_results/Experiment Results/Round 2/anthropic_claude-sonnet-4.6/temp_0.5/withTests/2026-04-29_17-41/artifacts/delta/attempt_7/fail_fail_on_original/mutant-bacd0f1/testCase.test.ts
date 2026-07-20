import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where this is longer than other followed by delete produces correct result', () => {
    const a = new Delta().retain(2).delete(1);
    const b = new Delta().retain(1, { bold: true });
    const result = a.transform(b, false);
    const expected = new Delta().retain(1, { bold: true }).retain(1).delete(1);
    expect(result).toEqual(expected);
  });
});