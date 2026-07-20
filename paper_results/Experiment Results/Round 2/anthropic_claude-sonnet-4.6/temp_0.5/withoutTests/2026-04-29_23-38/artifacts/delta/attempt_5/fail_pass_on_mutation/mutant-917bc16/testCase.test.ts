import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('compose handles remaining ops correctly when other is exhausted', () => {
    // Build a case where:
    // 1. The optimization fires (otherIter exhausted, isEqual true)
    // 2. rest has multiple ops
    // 3. The second op of rest could potentially merge with the first in the loop
    
    // a = retain(5) + retain(3) + retain(4)
    // But retain(5)+retain(3)+retain(4) all merge to retain(12)!
    // Need different attrs:
    // a = retain(5) + retain(3, {bold:true}) + retain(4)
    // b = retain(5)
    
    // rest = [retain(3,bold), retain(4)]
    // concat: push retain(3,bold) → [retain(5),retain(3,bold)]
    //         raw-concat retain(4) → [retain(5),retain(3,bold),retain(4)]
    //         chop: removes retain(4) → [retain(5),retain(3,bold)]
    // loop: retain(3,bold) → push → [retain(5),retain(3,bold)]
    //       retain(4) → push → [retain(5),retain(3,bold),retain(4)]
    //       chop → [retain(5),retain(3,bold)]
    // SAME!
    
    // What if retain(4) is NOT trailing? Add something after:
    // a = retain(5) + retain(3,bold) + retain(4) + insert('x')
    // rest = [retain(3,bold), retain(4), insert('x')]
    // concat: push retain(3,bold), raw-concat retain(4), raw-concat insert('x')
    //         → [retain(5),retain(3,bold),retain(4),insert('x')]
    //         chop: last op is insert → kept
    // loop: push retain(3,bold), push retain(4), push insert('x')
    //       → [retain(5),retain(3,bold),retain(4),insert('x')]
    //       chop → kept
    // SAME!
    
    // I need a case where push(retain(4)) merges with something but raw-concat doesn't
    // After pushing retain(3,bold), last op is retain(3,bold)
    // retain(4) has no attrs, different from retain(3,bold) → no merge
    // SAME!
    
    // What if retain(4) has same attrs as retain(5) (the newOp)?
    // a = retain(5) + retain(3,bold) + retain(4)
    // After pushing retain(3,bold), last op is retain(3,bold)
    // retain(4) has no attrs ≠ bold → no merge
    // SAME!
    
    // What if we use: a = retain(5) + retain(3) + retain(4,bold)
    // rest = [retain(3), retain(4,bold)]
    // After pushing retain(3): merges with retain(5) → retain(8)
    // retain(4,bold) has attrs ≠ none → no merge with retain(8)
    // concat: push retain(3) → merges → retain(8)
    //         raw-concat retain(4,bold) → [retain(8),retain(4,bold)]
    //         chop: last op has attrs → kept
    // loop: retain(3) → push → merges → retain(8)
    //       retain(4,bold) → push → no merge → [retain(8),retain(4,bold)]
    //       chop → kept
    // SAME!
    
    const a = new Delta().retain(5).retain(3).retain(4, { bold: true });
    // But retain(5)+retain(3) merge to retain(8)!
    // a.ops = [{retain:8},{retain:4,bold}]
    
    const b = new Delta().retain(8);
    // b.ops = [{retain:8}]
    
    // Pre-opt: firstOther = retain(8), no attrs
    //   thisIter.peekType() = 'retain' → while doesn't execute
    //   firstOther.retain - firstLeft = 0 → otherIter NOT advanced
    // Main loop: length = min(8,8) = 8
    //   thisOp = retain(8), otherOp = retain(8), newOp = retain(8)
    //   push → [retain(8)]
    //   Optimization: !otherIter.hasNext() = true, isEqual = true → FIRES!
    //   rest = [retain(4,bold)]
    //   concat: push retain(4,bold) → [retain(8),retain(4,bold)]
    //   chop: last op has attrs → kept
    //   Result: [retain(8),retain(4,bold)]
    // Loop: retain(4,bold) → push → [retain(8),retain(4,bold)]
    //       chop → kept
    //       Result: [retain(8),retain(4,bold)]
    // SAME!
    
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { retain: 8 },
      { retain: 4, attributes: { bold: true } },
    ]);
  });
});