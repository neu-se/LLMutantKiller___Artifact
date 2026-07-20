import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert component', () => {
  it('should correctly handle insert component with exact length match', () => {
    const a = new Delta().insert('ABC');
    const b = new Delta().insert('AXYZ');
    const expected = new Delta().retain(1).insert('XYZ');
    const result = a.diff(b);
    expect(result.ops).toEqual(expected.ops);
  });
});