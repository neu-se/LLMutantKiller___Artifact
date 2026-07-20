import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where this has embed and other has number with same length', () => {
    const a = new Delta().retain({ image: 'foo' });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().retain(1, { bold: true });
    expect(a.transform(b, false)).toEqual(expected);
  });
});