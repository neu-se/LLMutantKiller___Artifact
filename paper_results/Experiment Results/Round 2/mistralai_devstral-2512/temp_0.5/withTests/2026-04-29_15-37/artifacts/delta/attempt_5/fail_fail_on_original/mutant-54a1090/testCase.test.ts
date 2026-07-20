import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should trigger retain optimization when first other op is a plain retain', () => {
    const a = new Delta().insert('A').insert('B').insert('C').retain(2);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('A').insert('B').insert('C').retain(2).insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});