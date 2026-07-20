import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should trigger retain optimization when first operation is retain without attributes', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(1).insert('X');
    const expected = new Delta().insert('AXB').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});