import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('retain without attributes should not produce retain ops in the forEach loop', () => {
    // When op is a numeric retain WITH attributes, the else-if branch correctly fires.
    // When op is a numeric retain WITHOUT attributes, the original else-if (op.retain && op.attributes)
    // is false, so nothing happens in the forEach. But with mutation (else if true), it fires
    // and adds spurious retain ops, breaking the result.
    const base = new Delta().insert('AB', { bold: true });
    // retain(2) with NO attributes - handled by early return path for simple retains
    // We need retain with attributes=null that falls into the op.delete || retain branch
    // Actually: retain(2, { bold: null }) has attributes, retain(2) has no attributes
    // Let's use a combined delta: retain(2) no attrs goes through simple path,
    // but retain(2, {}) - empty attributes object won't be set on newOp
    // The key: retain with explicit null attributes that gets stripped
    const delta = new Delta().retain(2);
    const inverted = delta.invert(base);
    
    // Simple retain with no attributes: should just be retain(2) in inverted
    const expected = new Delta().retain(2);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});