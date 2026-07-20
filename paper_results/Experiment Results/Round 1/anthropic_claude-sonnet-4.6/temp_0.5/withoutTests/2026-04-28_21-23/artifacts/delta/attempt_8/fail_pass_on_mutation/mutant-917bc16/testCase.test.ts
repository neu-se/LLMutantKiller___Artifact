import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose optimization correctly handles remaining ops via concat', () => {
    // Create a delta where after the optimization fires,
    // rest has multiple ops that concat appends directly
    // The second op in rest would be merged by the loop but not by concat
    // This requires the first op of rest to be the same type as the second
    // after being processed - which happens when a split op is followed by same type
    
    // a: retain(2), retain(3) -> but these merge to retain(5)
    // We need a case where the iterator splits an op and the next op is same type
    // a: retain(5, {bold:true}), retain(3, {bold:true}) -> merge to retain(8,{bold:true})
    // Still merges...
    
    // Let's try: a has retain(1,bold), then insert('X'), then insert('Y')
    // But insert('X') and insert('Y') merge to insert('XY')
    
    // What about: retain(1,bold), insert('X',{a:1}), insert('Y',{a:2})
    // These don't merge (different attributes)
    // rest = [{insert:'X',{a:1}}, {insert:'Y',{a:2}}]
    // concat: push {insert:'X',{a:1}} (no merge with retain), append {insert:'Y',{a:2}}
    // loop: process {insert:'X',{a:1}} -> push -> no merge. Process {insert:'Y',{a:2}} -> push -> no merge
    // Same!
    
    // I need two ops that DON'T merge in rest but WOULD merge after loop processing
    // This seems impossible for well-formed Deltas
    
    const a = new Delta().retain(1, { bold: true }).insert('X', { a: 1 }).insert('Y', { a: 2 });
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { retain: 1, attributes: { bold: true } },
      { insert: 'X', attributes: { a: 1 } },
      { insert: 'Y', attributes: { a: 2 } },
    ]);
  });
});