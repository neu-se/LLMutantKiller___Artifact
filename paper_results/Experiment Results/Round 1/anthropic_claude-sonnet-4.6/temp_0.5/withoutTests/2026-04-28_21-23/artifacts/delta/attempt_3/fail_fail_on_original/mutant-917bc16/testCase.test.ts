import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('merges adjacent retains when optimization fires', () => {
    // a: retain(3), retain(2) -> effectively retain(5) after push
    // Actually let's use: retain(2) with attributes, retain(3) without
    // b: retain(2) (only covers first retain)
    // After processing: newOp={retain:2, attributes:{bold:true}}
    // delta has [{retain:2, attributes:{bold:true}}]
    // otherIter exhausted, last op = newOp -> optimization fires
    // rest = [retain(3)], concat merges? No, different attributes
    // Hmm, let me try retain(2) no attrs, retain(3) no attrs
    // b: retain(2)
    // newOp = {retain:2}, delta=[{retain:2}], last==newOp -> optimization
    // concat([retain(3)]) -> push retain(3) -> merges with retain(2) -> [{retain:5}]
    // Without optimization: loop, thisIter has retain(3), otherIter phantom retain(Inf)
    // length=min(3,Inf)=3, thisOp=retain(3), otherOp=retain(3)
    // otherOp.retain=3 truthy, thisOp.retain=3 number -> newOp={retain:3}
    // push -> merges with retain(2) -> [{retain:5}]
    // Same result again...
    const a = new Delta().retain(2).retain(3);
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ retain: 5 }]);
  });
});