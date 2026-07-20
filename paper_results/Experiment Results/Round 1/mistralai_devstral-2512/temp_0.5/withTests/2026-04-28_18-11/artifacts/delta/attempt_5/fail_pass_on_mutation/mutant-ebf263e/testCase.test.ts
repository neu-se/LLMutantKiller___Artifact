import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first operation is retain without attributes and length matches insert', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().insert('ABCX');
    expect(a.compose(b)).toEqual(expected);
  });
});