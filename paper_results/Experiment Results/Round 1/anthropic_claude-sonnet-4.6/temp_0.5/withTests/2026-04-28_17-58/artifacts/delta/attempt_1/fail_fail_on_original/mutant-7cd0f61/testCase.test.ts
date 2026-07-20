import Delta from "../../src/Delta";

describe('diff() error message', () => {
  it('should throw with message "diff() called with non-document" when this delta contains a non-insert op', () => {
    // `a` is a non-document delta (contains retain, not just inserts)
    // `b` is a valid document delta (only inserts)
    // In the original code: delta === other is false (delta is `this`), so prep = 'with'
    // In the mutated code: true ? 'on' : 'with' always gives 'on', so error says 'on'
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().insert('A');

    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});