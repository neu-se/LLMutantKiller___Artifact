import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() - retain without attributes should not produce extra ops', () => {
  it('retain without attributes should not add retain ops in inverted delta', () => {
    // A delta that retains characters without any attributes
    // In the original: else if (op.retain && op.attributes) => false (no attributes)
    // In the mutated: else if (true) => executes incorrectly
    const delta = new Delta().retain(2).delete(2);
    const base = new Delta().insert('1234');
    
    // Inverting: the delete(2) should become insert('34')
    // The retain(2) without attributes should be handled by the simple retain branch earlier
    // and produce retain(2) in the inverted delta
    const inverted = delta.invert(base);
    
    // Expected: retain(2) then insert('34')
    const expected = new Delta().retain(2).insert('34');
    expect(inverted).toEqual(expected);
    
    // Also verify the round-trip property
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});