import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete and retain operations', () => {
  it('should correctly handle delete followed by retain', () => {
    const a = new Delta().delete(1).retain(2);
    const b = new Delta().retain(3);
    const expected = new Delta().retain(2);
    expect(a.transform(b, true)).toEqual(expected);
  });
});