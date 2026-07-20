import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete and delete operations', () => {
  it('should correctly handle two delete operations', () => {
    const a = new Delta().delete(1);
    const b = new Delta().delete(1);
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});