import Delta from "../../src/Delta";

describe('compose() retain start optimization with non-insert first op', () => {
  it('should not include retain ops in the initial optimization pass', () => {
    const a = new Delta().retain(2).insert('Hello');
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().retain(2).insert('X').insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});