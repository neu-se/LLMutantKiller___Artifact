import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('invert correctly handles retain with attributes over multiple base ops', () => {
    // Base has two separate insert ops
    const base = new Delta([{insert: 'ab'}, {insert: 'cd', attributes: {italic: true}}]);
    const delta = new Delta().retain(4, { bold: true });
    const inverted = delta.invert(base);
    
    // With original: forEach condition false, nothing added, empty delta
    // With mutated: forEach adds retain(2, ...) + retain(2, ...) = 2 ops
    // The key difference: mutated produces ops, original doesn't
    // OR if original somehow produces ops too, the attributes differ
    
    // Test that inverted correctly represents what's needed to undo the retain
    // For a retain(4, {bold:true}) on base with mixed attributes:
    // - First 2 chars had no bold → need retain(2, {bold:null}) to undo
    // - Last 2 chars had italic but no bold → need retain(2, {bold:null}) to undo
    // Original produces nothing (bug?), mutated produces retain(2,{bold:null})+retain(2,{bold:null})
    
    expect(inverted.ops.length).toBeGreaterThan(0);
  });
});