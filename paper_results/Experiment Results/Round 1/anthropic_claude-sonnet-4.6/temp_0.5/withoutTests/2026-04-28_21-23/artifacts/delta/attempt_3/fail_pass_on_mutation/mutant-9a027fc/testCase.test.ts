import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transforms retain with object embed correctly when other has number retain', () => {
    // Register a simple embed handler
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    
    // this: retain({image: 'a'}) - length 1
    // other: retain(3, {bold: true}) - length 3
    // length = min(1, 3) = 1
    // thisOp = {retain: {image: 'a'}}, otherOp = {retain: 1}
    // thisData = {image: 'a'}, otherData = 1
    // Original: typeof 1 === 'object' → false → transformedData = length = 1
    // Mutated: true && 1 !== null → true → transformedData = otherData = 1
    // SAME! Both = 1
    
    const thisDelta = new Delta().retain({ image: 'a' });
    const otherDelta = new Delta().retain(3, { bold: true });
    
    const result = thisDelta.transform(otherDelta, false);
    
    Delta.unregisterEmbed('image');
    
    // Expected: retain(1, {bold:true}) + retain(2, {bold:true}) = retain(3, {bold:true})
    expect(result).toEqual(new Delta().retain(3, { bold: true }));
  });
});