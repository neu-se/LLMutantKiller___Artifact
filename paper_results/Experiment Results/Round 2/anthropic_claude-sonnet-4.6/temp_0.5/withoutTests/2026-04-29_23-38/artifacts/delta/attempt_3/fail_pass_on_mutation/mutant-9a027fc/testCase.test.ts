import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform: object retain in other with numeric retain in this produces object retain result', () => {
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    // Make this have a numeric retain of 2 and other have an object retain
    // followed by a numeric retain of 1
    // this: retain(2)
    // other: retain({embed: {x: 1}}) [length 1], retain(1, {bold: true})
    // Step 1: length = min(2, 1) = 1
    //   thisOp = {retain: 1}, otherOp = {retain: {embed: {x:1}}}
    //   thisData = 1 (number), otherData = {embed: {x:1}} (object)
    //   Original: typeof object === 'object' → true → transformedData = otherData (object)
    //   Mutated: true && object !== null → true → transformedData = otherData (object)
    //   SAME. delta.retain({embed:{x:1}})
    // Step 2: length = min(1, 1) = 1
    //   thisOp = {retain: 1}, otherOp = {retain: 1, attrs: {bold:true}}
    //   thisData = 1, otherData = 1
    //   transformedData = 1 (both)
    //   delta.retain(1, {bold:true})
    // Result: [{retain:{embed:{x:1}}}, {retain:1,attrs:{bold:true}}]
    
    const a = new Delta().retain(2);
    const b = new Delta().retain({ embed: { x: 1 } }).retain(1, { bold: true });
    
    const result = a.transform(b, false);
    expect(result.ops).toEqual([
      { retain: { embed: { x: 1 } } },
      { retain: 1, attributes: { bold: true } }
    ]);
    
    Delta.unregisterEmbed('embed');
  });
});