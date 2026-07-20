import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should throw "diff() called with non-document" when this delta contains non-insert ops', () => {
    // b has a retain, making it a non-document
    // When b.diff(a) is called, b is `this` (not `other`)
    // Original: delta === other is false, so prep = 'with' -> 'diff() called with non-document'
    // Mutated: always 'on' -> 'diff() called on non-document'
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');

    expect(() => {
      b.diff(a);
    }).toThrow(new Error('diff() called with non-document'));
  });
});