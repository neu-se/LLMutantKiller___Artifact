import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('insert + retain + insert where other insert comes after retain covering some of this inserts', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2).insert('D');
    const expected = new Delta().insert('A').insert('B').insert('D').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});