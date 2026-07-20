import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('detects mutation in retain end optimization via concat vs loop merging', () => {
    // We need:
    // 1. optimization fires (lastOp == newOp)
    // 2. rest has 2+ ops where ops[1] would merge with ops[0] after push
    // 
    // a: insert('A'), insert('B'), insert('C')  [stored as insert('ABC') due to push merging]
    // Hmm, they'd be merged on construction...
    //
    // Need ops that DON'T merge on construction but WOULD merge after optimization fires
    // Use attributes to prevent initial merging:
    // a: insert('A', bold), insert('B'), insert('C')
    // b: retain(1, bold:null), retain(1), retain(1)
    //
    // pair1: insert('A',bold) + retain(1,bold:null) -> newOp={insert:'A'}, pushed
    // pair2: insert('B') + retain(1) -> newOp={insert:'B'}
    //   delta.ops = [{insert:'A'}], isEqual({insert:'A'}, {insert:'B'})? No
    //   push merges: delta.ops = [{insert:'AB'}]
    // pair3: insert('C') + retain(1) -> newOp={insert:'C'}
    //   delta.ops = [{insert:'AB'}], isEqual({insert:'AB'},{insert:'C'})? No
    //   push merges: delta.ops=[{insert:'ABC'}]
    // No optimization fires here.
    //
    // I need newOp to equal the last op. Let me try retain ops:
    // a: retain(1), insert('B'), insert('C')
    // b: retain(1), retain(1), retain(1)  [but otherIter needs to be NOT exhausted when opt fires]
    //
    // pair1: retain(1)+retain(1) -> newOp={retain:1}, pushed. delta=[{retain:1}]
    // pair2: insert('B')+retain(1) -> newOp={insert:'B'}, pushed. delta=[{retain:1},{insert:'B'}]
    // isEqual({insert:'B'},{insert:'B'})? After this push... wait the check is BEFORE push
    //
    // The check happens after computing newOp but before pushing:
    // if (isEqual(delta.ops[last], newOp)) { return delta.concat(rest).chop() }
    // delta.push(newOp)  <- this happens if optimization doesn't fire
    //
    // So for pair2: newOp={insert:'B'}, delta.ops=[{retain:1}]
    // isEqual({retain:1}, {insert:'B'})? No. Push it.
    //
    // For pair3: newOp={insert:'C'}, delta.ops=[{retain:1},{insert:'B'}]  
    // Wait, push would have merged 'B' if there was a prior insert... no, retain(1) is last
    // isEqual({insert:'B'},{insert:'C'})? No. Push -> merges to {insert:'BC'}
    //
    // Hmm. Let me try to get newOp == lastOp with retain ops that don't merge:
    // a: retain(1,bold), retain(1,italic), insert('X'), insert('Y')
    // b: retain(2), retain(1), retain(1)
    //
    // pair1: retain(1,bold)+retain(1) -> newOp={retain:1,bold}, pushed
    // pair2: retain(1,italic)+retain(1) -> newOp={retain:1,italic}
    //   delta.ops=[{retain:1,bold}], isEqual({retain:1,bold},{retain:1,italic})? No. Push.
    //   delta=[{retain:1,bold},{retain:1,italic}]
    // pair3: insert('X')+retain(1) -> newOp={insert:'X'}
    //   isEqual({retain:1,italic},{insert:'X'})? No. Push.
    //   delta=[{retain:1,bold},{retain:1,italic},{insert:'X'}]
    // pair4: insert('Y')+retain(1) -> newOp={insert:'Y'}
    //   isEqual({insert:'X'},{insert:'Y'})? No. Push -> merge to {insert:'XY'}
    //
    // I can't seem to get newOp == lastOp with different ops...
    // 
    // What if I use SAME retain value? 
    // a: retain(1), retain(1) [these merge to retain(2) on construction!]
    //
    // The only way to have same consecutive ops is if they have different attributes
    // that then get resolved to the same thing...
    //
    // retain(1, {bold:true}) composed with retain(1, {bold:null}) -> retain(1) [bold removed]
    // retain(1, {italic:true}) composed with retain(1, {italic:null}) -> retain(1) [italic removed]  
    // Both produce {retain:1}!
    
    const a = new Delta()
      .retain(1, { bold: true })
      .retain(1, { italic: true })
      .insert('X')
      .insert('Y');
    const b = new Delta()
      .retain(1, { bold: null })
      .retain(1, { italic: null })
      .retain(2);
    
    // pair1: retain(1,bold) + retain(1,bold:null) -> newOp={retain:1}, pushed
    //   delta=[{retain:1}]
    // pair2: retain(1,italic) + retain(1,italic:null) -> newOp={retain:1}
    //   isEqual(delta.ops[1], {retain:1})? delta.ops[1] = undefined (length=1, index=0)
    //   Wait: delta.ops[delta.ops.length-1] = delta.ops[0] = {retain:1}
    //   isEqual({retain:1}, {retain:1})? YES! Optimization fires!
    //   rest = thisIter.rest() = [insert('X'), insert('Y')]  [or insert('XY') if merged]
    //   Actually a was constructed as: retain(1,bold), retain(1,italic), insert('XY')
    //   After consuming retain(1,bold) and retain(1,italic), rest = [insert('XY')]... 
    //   Hmm but the iterator splits ops, so rest after consuming 1+1 of retain(1,bold) and retain(1,italic)
    //   = [insert('X'), insert('Y')] if they were separate, but push merged them to insert('XY')
    //   So rest = [{insert:'XY'}]
    //   concat: push({insert:'XY'}) -> delta=[{retain:1},{insert:'XY'}]... 
    //   But wait, otherIter still has retain(2)! Those get ignored by the optimization!
    //   
    //   Without optimization:
    //   pair3: insert('X')+retain(1) -> {insert:'X'}, pushed. delta=[{retain:1},{insert:'X'}] 
    //     (wait, retain(1,bold)+retain(1,bold:null) merged to retain(2)? No, push checks:
    //     isEqual(newOp.attributes, lastOp.attributes) - {}: {} yes, and both retain numbers
    //     retain(1)+retain(1) -> retain(2)! So delta=[{retain:2}] after pair1+pair2
    //   
    //   Hmm wait, after pair1: newOp={retain:1}, delta=[], push -> delta=[{retain:1}]
    //   After pair2: newOp={retain:1}, 
    //     isEqual(delta.ops[0], {retain:1})? YES - optimization fires in original!
    //     rest = thisIter.rest() after consuming retain(1,bold) and retain(1,italic)
    //     thisIter started with [retain(1,bold), retain(1,italic), insert('XY')]
    //     consumed: retain(1,bold) in pair1, retain(1,italic) in pair2
    //     rest = [{insert:'XY'}]  (the insert('X').insert('Y') merged to insert('XY'))
    //     
    //     otherIter still has retain(2) remaining!
    //     
    //     Original: return delta.concat(new Delta([{insert:'XY'}])).chop()
    //       = [{retain:1}, {insert:'XY'}]  (retain(2) from b is IGNORED)
    //     
    //     Mutated (no optimization): loop continues
    //     pair3: insert('XY') length=2, otherIter has retain(2)
    //       length = min(2, 2) = 2
    //       thisOp = next(2) = {insert:'XY'}
    //       otherOp = next(2) = {retain:2}
    //       otherOp.retain is truthy, thisOp.retain is null -> insert case
    //       newOp.insert = thisOp.insert = 'XY'
    //       attributes = compose(undefined, undefined, false) = undefined
    //       push({insert:'XY'})
    //       isEqual(delta.ops[last], {insert:'XY'})? delta=[{retain:1},{insert:'XY'}]... 
    //       wait this is pair3 not pair2
    //       
    //     After pair3: delta=[{retain:1},{insert:'XY'}], otherIter exhausted
    //     Loop ends. chop() -> same result [{retain:1},{insert:'XY'}]
    //     
    //     SAME RESULT! The retain(2) in b doesn't change anything because it's a plain retain.
    
    // I need the remaining otherIter ops to have ATTRIBUTES that would modify the result
    
    const a2 = new Delta()
      .retain(1, { bold: true })
      .retain(1, { italic: true })
      .insert('X');
    const b2 = new Delta()
      .retain(1, { bold: null })
      .retain(1, { italic: null })
      .retain(1, { color: 'red' });
    
    // pair1: retain(1,bold)+retain(1,bold:null) -> {retain:1}, pushed. delta=[{retain:1}]
    // pair2: retain(1,italic)+retain(1,italic:null) -> {retain:1}
    //   isEqual({retain:1},{retain:1})? YES - optimization fires!
    //   rest = [{insert:'X'}]
    //   Original returns: delta.concat([{insert:'X'}]).chop() = [{retain:1},{insert:'X'}]
    //   The retain(1,color:red) from b is IGNORED
    //   
    //   Mutated continues:
    //   pair3: insert('X')+retain(1,color:red) -> newOp={insert:'X',attributes:{color:'red'}}
    //   push -> delta=[{retain:1},{insert:'X',color:'red'}]... 
    //   isEqual({retain:1},{insert:'X',color:'red'})? No. chop -> same
    //   Result: [{retain:1},{insert:'X',attributes:{color:'red'}}]
    //   
    //   DIFFERENT! Original: [{retain:1},{insert:'X'}]
    //             Mutated:  [{retain:1},{insert:'X',attributes:{color:'red'}}]
    
    const expected2 = new Delta()
      .retain(1)
      .insert('X');
    
    expect(a2.compose(b2)).toEqual(expected2);
  });
});