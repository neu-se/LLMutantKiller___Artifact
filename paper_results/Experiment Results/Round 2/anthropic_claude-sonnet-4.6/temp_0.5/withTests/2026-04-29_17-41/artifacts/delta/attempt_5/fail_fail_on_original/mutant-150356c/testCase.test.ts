import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose', () => {
  it('retain start optimization should not consume delete ops', () => {
    const a = new Delta().delete(3).insert('Hello');
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().delete(3).insert('X').insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});