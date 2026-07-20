import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('delete + delete should produce empty delta', () => {
    const a = new Delta().delete(1);
    const b = new Delta().delete(1);
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});