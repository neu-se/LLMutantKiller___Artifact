import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first operation is retain without attributes and length exceeds insert', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(5).insert('X');
    const expected = new Delta().insert('AB').insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});