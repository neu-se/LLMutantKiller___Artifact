import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('preserves null attributes on insert ops when optimization fires after other iterator exhausted', () => {
    // a has: retain(1, {bold:true}), insert('hello', {bold:null})
    // b has: retain(1)
    // After processing retain(1) vs retain(1): newOp={retain:1,attrs:{bold:true}}
    // otherIter is now exhausted, and last delta op equals newOp
    // Original: optimization fires, concat(rest) preserves insert with {bold:null}
    // Mutated: optimization skipped, loop processes insert through AttributeMap.compose
    //          which strips null attributes (keepNull=false for inserts)
    const a = new Delta()
      .retain(1, { bold: true })
      .insert('hello', { bold: null });
    const b = new Delta().retain(1);
    const composed = a.compose(b);
    expect(composed.ops).toEqual([
      { retain: 1, attributes: { bold: true } },
      { insert: 'hello', attributes: { bold: null } },
    ]);
  });
});