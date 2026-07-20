import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert component', () => {
  it('should correctly handle insert component with exact length match', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('AB');
    const expected = new Delta().retain(1).insert('B');
    const result = a.diff(b);
    expect(result).toEqual(expected);
  });
});