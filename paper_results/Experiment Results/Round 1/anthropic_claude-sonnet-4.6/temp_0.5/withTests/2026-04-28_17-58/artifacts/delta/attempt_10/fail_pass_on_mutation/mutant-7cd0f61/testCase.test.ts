import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('distinguishes error source: "on" when other is non-document vs "with" when this is non-document', () => {
    const docDelta = new Delta().insert('hello');
    const nonDocDelta = new Delta().delete(3);

    // When `other` is non-document: delta === other, so prep = 'on' (same in both original and mutated)
    expect(() => {
      docDelta.diff(nonDocDelta);
    }).toThrow(new Error('diff() called on non-document'));

    // When `this` is non-document: delta !== other, so prep = 'with' in original, 'on' in mutated
    expect(() => {
      nonDocDelta.diff(docDelta);
    }).toThrow(new Error('diff() called with non-document'));
  });
});