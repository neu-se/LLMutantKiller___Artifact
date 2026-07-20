import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete and retain operations', () => {
  it('should correctly handle delete operation when transforming with retain', () => {
    const a = new Delta().delete(1);
    const b = new Delta().retain(1).delete(1);
    const expected = new Delta().delete(1);
    expect(a.transform(b, true)).toEqual(expected);
  });
});