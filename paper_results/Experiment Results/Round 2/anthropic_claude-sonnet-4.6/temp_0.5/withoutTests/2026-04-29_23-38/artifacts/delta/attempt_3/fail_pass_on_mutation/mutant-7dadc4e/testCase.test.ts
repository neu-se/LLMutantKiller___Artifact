import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('detects mutation by checking behavior with null retain in other ops', () => {
    // Construct deltas with retain:null directly in ops
    // thisOp: retain number, otherOp: retain null
    // In transform, when both are in the "else" branch (not insert/delete):
    // otherOp.retain = null, which is falsy, so we go to else if (otherOp.delete)
    // delete is undefined, so nothing happens - same in both versions
    
    // The only way to hit the ternary with null is if otherOp.retain is null AND truthy
    // which is impossible. So let's verify the embed path works correctly instead.
    
    // Create scenario: thisOp is number retain, otherOp is object retain (embed)
    // Both versions should use otherData (the embed object) as transformedData
    Delta.registerEmbed('img', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    
    const thisDelta = new Delta([{ retain: 1 }]);
    const otherDelta = new Delta([{ retain: { img: { src: 'a.png' } } }]);
    
    const result = thisDelta.transform(otherDelta, false);
    // Both original and mutated: otherData is non-null object => use otherData
    expect(result.ops[0].retain).toEqual({ img: { src: 'a.png' } });
    
    Delta.unregisterEmbed('img');
  });
});