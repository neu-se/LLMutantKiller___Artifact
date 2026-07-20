import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('invert with retain-attrs over base with mixed attributes produces correct ops', () => {
    // Base has two ops with different attributes
    const base = new Delta()
      .insert('AB', { bold: true })
      .insert('CD', { italic: true });
    // Change retains all 4 with color:red
    const change = new Delta().retain(4, { color: 'red' });
    const inverted = change.invert(base);
    // Mutated: forEach adds retain per base op:
    //   retain(2, AttributeMap.invert({color:'red'}, {bold:true})) = retain(2, {color:null})
    //   retain(2, AttributeMap.invert({color:'red'}, {italic:true})) = retain(2, {color:null})
    //   merged: retain(4, {color:null})
    // Original: nothing added, empty delta
    // Test that inverted has ops (mutated) vs empty (original)
    // Since previous tests show both pass equality checks, let me check length
    expect(inverted.ops).toHaveLength(0);
  });
});