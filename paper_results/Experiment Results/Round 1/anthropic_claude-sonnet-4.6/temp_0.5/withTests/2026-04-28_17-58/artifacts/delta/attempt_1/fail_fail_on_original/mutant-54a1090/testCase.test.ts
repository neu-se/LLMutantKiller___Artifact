import Delta from "../../src/Delta";

describe('compose()', () => {
  it('insert ops in this are correctly handled when other starts with plain retain', () => {
    // When `other` starts with a plain retain (no attributes),
    // the original code has a special path to handle inserts in `this`
    // that fall within that retain range.
    // The mutation makes this condition always false, breaking this behavior.
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5).insert(' World');
    const expected = new Delta().insert('Hello World');
    expect(a.compose(b)).toEqual(expected);
  });
});