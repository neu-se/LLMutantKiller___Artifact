import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should correctly skip delete operations when transforming', () => {
    const a = new Delta().delete(1).retain(1);
    const b = new Delta().retain(2);
    const expected = new Delta().retain(1);
    expect(a.transform(b, true)).toEqual(expected);
  });
});