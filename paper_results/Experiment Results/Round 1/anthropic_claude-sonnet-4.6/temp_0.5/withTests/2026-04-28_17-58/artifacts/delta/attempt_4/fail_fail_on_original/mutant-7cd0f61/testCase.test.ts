import Delta from "../../../../../../../../../../../../src/Delta";

describe('diff()', () => {
  it('should throw "diff() called with non-document" when this delta is a non-document', () => {
    // `a` contains a retain op, making it a non-document delta (not `other`)
    // `b` is a valid document delta with only inserts
    // In original code: delta === other is false when processing `this`, so prep = 'with'
    // In mutated code: true ? 'on' : 'with' always gives 'on', error says 'on' instead of 'with'
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().insert('A');

    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});