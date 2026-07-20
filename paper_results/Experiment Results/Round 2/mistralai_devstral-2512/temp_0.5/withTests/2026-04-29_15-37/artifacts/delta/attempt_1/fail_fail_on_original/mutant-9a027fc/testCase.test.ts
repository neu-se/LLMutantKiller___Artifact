import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('transform() with embeds', () => {
  it('should correctly transform when otherData is a number', () => {
    const a = new Delta().retain(5);
    const b = new Delta().retain(3).insert('test');
    const expected = new Delta().retain(3).insert('test').retain(2);
    expect(a.transform(b, true)).toEqual(expected);
  });
});