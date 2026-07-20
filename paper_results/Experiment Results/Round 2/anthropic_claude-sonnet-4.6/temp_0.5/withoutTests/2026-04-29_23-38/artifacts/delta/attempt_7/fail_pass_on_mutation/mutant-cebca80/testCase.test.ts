import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('invert detects mutation when base has attributes not in change', () => {
    // Base has italic, change retains with bold:true (doesn't touch italic)
    // AttributeMap.invert({bold:true}, {italic:true}) should return {bold:null}
    // since italic is unchanged, only bold needs to be inverted
    const base = new Delta().insert('Hi', { italic: true });
    const change = new Delta().retain(2, { bold: true });
    const inverted = change.invert(base);
    // Mutated: retain(2, {bold:null}) added
    // Original: nothing added
    // If AttributeMap.invert({bold:true}, {italic:true}) = {bold:null}, mutated != original
    expect(inverted).toEqual(new Delta().retain(2, { bold: null }));
  });
});