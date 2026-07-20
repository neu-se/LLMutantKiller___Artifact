import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose', () => {
  it('retain start optimization does not consume retain ops from a', () => {
    const a = new Delta().retain(3).insert('Hello');
    const b = new Delta().retain(2).insert('X');
    // The original code correctly produces this result
    const expected = new Delta().retain(2).insert('X').retain(1).insert('Hello');
    const result = a.compose(b);
    expect(result).toEqual(expected);
  });
});