import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with numeric retain and attributes', () => {
  it('should correctly invert a numeric retain with attributes without throwing', () => {
    // This test covers the case where op.retain is a number (not an object)
    // The mutation changes `typeof op.retain === 'object'` to `true`,
    // which would cause numeric retains with attributes to incorrectly enter
    // the embed handler branch, throwing an error like "cannot retain a number"
    const delta = new Delta().retain(2, { bold: true });
    const base = new Delta().insert('Hello World');

    // In the original code, this should work correctly and produce an inverted delta
    // In the mutated code, after handling the numeric retain branch and returning,
    // the else-if with `true` would be evaluated, causing it to try to treat
    // the numeric retain as an embed, throwing an error

    // The correct inverted result should be: retain(2, { bold: null })
    const expected = new Delta().retain(2, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    // Also verify the round-trip works
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});