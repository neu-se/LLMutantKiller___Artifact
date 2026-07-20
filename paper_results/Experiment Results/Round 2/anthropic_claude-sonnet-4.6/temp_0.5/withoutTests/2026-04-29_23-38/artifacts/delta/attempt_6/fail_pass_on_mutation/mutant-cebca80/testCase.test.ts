import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('invert of retain that removes attributes should restore original attributes', () => {
    const base = new Delta().insert('Hello', { bold: true });
    const change = new Delta().retain(5, { bold: null });
    const inverted = change.invert(base);
    // AttributeMap.invert({bold:null}, {bold:true}) should return {bold:true}
    // Mutated: forEach adds retain(5, {bold:true}) 
    // Original: forEach does nothing, empty delta
    expect(inverted).toEqual(new Delta().retain(5, { bold: true }));
  });
});