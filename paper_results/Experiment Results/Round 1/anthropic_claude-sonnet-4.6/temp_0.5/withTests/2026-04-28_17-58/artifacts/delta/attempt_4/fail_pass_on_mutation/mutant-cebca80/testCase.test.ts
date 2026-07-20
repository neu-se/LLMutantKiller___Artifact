import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() mutation detection', () => {
  it('detects mutation in forEach condition inside delete/retain handler', () => {
    // Use a retain with attributes so it goes into the else if (op.delete || typeof op.retain === 'number') branch
    // The base has styled text, delta retains with different attributes
    const delta = new Delta().retain(3, { bold: true });
    const base = new Delta().insert('abc', { italic: true });

    const expected = new Delta().retain(3, { bold: null });
    const inverted = delta.invert(base);

    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});