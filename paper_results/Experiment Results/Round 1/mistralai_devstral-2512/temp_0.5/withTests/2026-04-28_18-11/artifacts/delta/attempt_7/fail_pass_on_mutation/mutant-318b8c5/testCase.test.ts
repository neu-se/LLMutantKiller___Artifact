import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert component', () => {
  it('should correctly handle insert component with length greater than otherIter.peekLength()', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('ABCDE');
    const expected = new Delta().retain(1).insert('BCDE');
    const result = a.diff(b);
    expect(result.ops).toEqual(expected.ops);
  });
});