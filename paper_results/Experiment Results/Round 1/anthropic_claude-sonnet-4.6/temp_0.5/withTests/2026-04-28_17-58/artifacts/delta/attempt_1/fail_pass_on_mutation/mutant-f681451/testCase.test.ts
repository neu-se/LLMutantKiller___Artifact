import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('delete + retain should produce empty delta, not a retain', () => {
    const a = new Delta().delete(1);
    const b = new Delta().retain(1, { bold: true, color: 'red' });
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});