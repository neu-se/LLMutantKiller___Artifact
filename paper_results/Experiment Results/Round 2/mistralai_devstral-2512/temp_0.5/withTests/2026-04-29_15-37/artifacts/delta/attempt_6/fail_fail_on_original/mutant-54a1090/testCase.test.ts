import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should apply retain optimization when first other op is a plain retain', () => {
    const a = new Delta().insert('A').insert('B').insert('C').retain(2);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('A').insert('B').insert('C').insert('D').retain(2);
    expect(a.compose(b)).toEqual(expected);
  });
});