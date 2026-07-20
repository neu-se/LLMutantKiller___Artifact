import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('should correctly invert a retain with attributes on a base document', () => {
    // When op.retain is a number with attributes, the invert should produce
    // a retain with inverted attributes. With the mutation, the inner else-if
    // becomes `true`, causing extra retain ops to be added inside forEach
    // for number retains, producing wrong output.
    const base = new Delta().insert('Hello');
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);
    // Original: retain(5, { bold: null }) - correct inversion
    // Mutated: retain(1, { bold: null }) x5 - wrong, individual chars
    expect(inverted).toEqual(new Delta().retain(5, { bold: null }));
  });
});