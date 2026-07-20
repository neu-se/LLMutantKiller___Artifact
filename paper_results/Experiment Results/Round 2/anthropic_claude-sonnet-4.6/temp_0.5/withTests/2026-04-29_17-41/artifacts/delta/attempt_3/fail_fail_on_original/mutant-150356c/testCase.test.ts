import Delta from "../../src/Delta";

describe('compose', () => {
  it('retain start optimization only applies to insert ops', () => {
    const a = new Delta().retain(1, { bold: true }).insert('Hello');
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().retain(1, { bold: true }).insert('X').insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});