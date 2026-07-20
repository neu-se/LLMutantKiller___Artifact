import Delta from "../../../../../../../../../../../../../src/Delta";

describe('diff() error message direction', () => {
  it('should say "with non-document" when this (not other) delta is a non-document', () => {
    // `a` contains a retain op, making it a non-document delta
    // `b` is a valid document delta with only inserts
    // In original: delta === other is false when processing `this`, so prep = 'with'
    // In mutated: true ? 'on' : 'with' always gives 'on', so error says 'on' instead of 'with'
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().insert('A');

    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});