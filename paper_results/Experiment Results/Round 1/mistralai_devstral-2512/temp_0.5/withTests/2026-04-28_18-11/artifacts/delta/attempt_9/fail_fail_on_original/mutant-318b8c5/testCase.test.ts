import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert component', () => {
  it('should correctly handle insert component with length less than otherIter.peekLength()', () => {
    const a = new Delta().insert('ABC');
    const b = new Delta().insert('AXYZCDE');
    const expected = new Delta().retain(1).insert('XYZ').retain(2);
    const result = a.diff(b);
    expect(result.ops).toEqual(expected.ops);
  });
});