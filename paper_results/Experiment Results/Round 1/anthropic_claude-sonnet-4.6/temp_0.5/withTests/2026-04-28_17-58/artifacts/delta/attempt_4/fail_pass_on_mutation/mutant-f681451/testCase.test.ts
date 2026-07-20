import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('trailing deletes with differing lengths exposes mutation', () => {
    const a = new Delta().retain(2).delete(1);
    const b = new Delta().delete(3);
    const expected = new Delta().delete(2);
    expect(a.transform(b, false)).toEqual(expected);
  });
});