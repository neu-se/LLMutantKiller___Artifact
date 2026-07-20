import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should handle delete operations correctly', () => {
    const a = new Delta().delete(2);
    const b = new Delta().delete(1);
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});