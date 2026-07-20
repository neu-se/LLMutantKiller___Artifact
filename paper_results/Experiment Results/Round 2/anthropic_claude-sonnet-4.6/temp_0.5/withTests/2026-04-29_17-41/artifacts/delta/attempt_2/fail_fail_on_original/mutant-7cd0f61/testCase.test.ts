import Delta from "../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() error message', () => {
  it('should throw "diff() called with non-document" when this delta has a non-document op', () => {
    // When `this` (a) has a delete op (non-document), the error should say "with non-document"
    // In the original: delta === other ? 'on' : 'with' — since delta is `this` (not `other`), prep = 'with'
    // In the mutated: true ? 'on' : 'with' — prep always = 'on'
    const a = new Delta().delete(4);
    const b = new Delta().insert('Test');
    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});