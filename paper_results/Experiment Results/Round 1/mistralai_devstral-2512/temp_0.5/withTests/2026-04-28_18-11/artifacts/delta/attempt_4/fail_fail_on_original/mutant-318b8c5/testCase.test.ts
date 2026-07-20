import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert component', () => {
  it('should correctly handle multiple insert operations with varying lengths', () => {
    const a = new Delta().insert('ABC');
    const b = new Delta().insert('AXYZC');
    const expected = new Delta().retain(1).insert('XYZ').retain(1);
    const result = a.diff(b);
    expect(result).toEqual(expected);
  });
});