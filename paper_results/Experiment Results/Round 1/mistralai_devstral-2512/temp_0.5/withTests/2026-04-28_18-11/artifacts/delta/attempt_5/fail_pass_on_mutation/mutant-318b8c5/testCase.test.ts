import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert component', () => {
  it('should correctly handle insert component with length exactly matching otherIter.peekLength()', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('ABC');
    const expected = new Delta().retain(1).insert('BC');
    const result = a.diff(b);
    expect(result.ops).toEqual(expected.ops);
  });
});