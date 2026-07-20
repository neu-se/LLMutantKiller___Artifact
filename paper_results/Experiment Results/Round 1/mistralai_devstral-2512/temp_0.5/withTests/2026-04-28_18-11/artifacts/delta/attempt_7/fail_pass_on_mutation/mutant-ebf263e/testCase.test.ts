import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first operation is retain without attributes and length matches insert exactly', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('ABX');
    expect(a.compose(b)).toEqual(expected);
  });
});