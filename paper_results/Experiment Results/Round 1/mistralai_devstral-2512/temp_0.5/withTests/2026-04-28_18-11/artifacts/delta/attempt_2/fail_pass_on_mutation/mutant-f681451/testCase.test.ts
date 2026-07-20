import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should correctly handle delete operations in transform', () => {
    const a = new Delta().delete(3);
    const b = new Delta().retain(2).delete(1);
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});