import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain optimization when first other op is a retain without attributes', () => {
    const a = new Delta().insert('A').insert('B').insert('C').delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('A').insert('B').insert('C').insert('D').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});