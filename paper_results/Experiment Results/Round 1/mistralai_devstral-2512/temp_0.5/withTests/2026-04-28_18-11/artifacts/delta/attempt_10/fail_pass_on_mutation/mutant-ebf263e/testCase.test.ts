import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first operation is retain without attributes and has mixed operations', () => {
    const a = new Delta().insert('A').insert('B').insert('C').delete(1);
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('ABX').insert('C').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});