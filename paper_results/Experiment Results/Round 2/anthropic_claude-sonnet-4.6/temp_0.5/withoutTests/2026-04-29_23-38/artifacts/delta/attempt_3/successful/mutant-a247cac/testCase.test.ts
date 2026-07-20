import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('compose optimization appends rest ops directly without merging', () => {
    const a = new Delta([{ retain: 5 }, { insert: 'A' }, { insert: 'B' }]);
    const b = new Delta([{ retain: 5 }]);
    
    const result = a.compose(b);
    
    // If optimization fires (original): rest=[{insert:'A'},{insert:'B'}] appended via concat
    // concat only pushes first op, rest are directly concatenated (no merging)
    // Result: [{retain:5},{insert:'A'},{insert:'B'}]
    
    // If optimization doesn't fire (mutated): loop processes each op
    // {insert:'A'} then {insert:'B'} are pushed separately, second merges with first
    // Result: [{retain:5},{insert:'AB'}]
    
    expect(result.ops).toEqual([{ retain: 5 }, { insert: 'A' }, { insert: 'B' }]);
  });
});