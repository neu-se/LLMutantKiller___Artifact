import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization with delete after inserts', () => {
    const a = new Delta().insert('A').insert('B').delete(2);
    const b = new Delta().retain(2).delete(1);
    const expected = new Delta().insert('A').delete(3);
    expect(a.compose(b)).toEqual(expected);
  });
});