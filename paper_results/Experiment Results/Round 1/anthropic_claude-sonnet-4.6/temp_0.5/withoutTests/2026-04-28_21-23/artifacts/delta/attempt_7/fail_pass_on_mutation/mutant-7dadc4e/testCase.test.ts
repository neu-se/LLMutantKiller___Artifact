import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transform with object retain and numeric retain uses otherData for object case', () => {
    // When otherOp.retain is a non-null object and thisOp.retain is a number
    // Original: typeof obj === 'object' && obj !== null => true => transformedData = otherData
    // Mutated: typeof obj === 'object' && true => true => transformedData = otherData
    // Same! But let's verify the exact output to ensure correctness
    
    // thisOp: retain(1) - numeric
    // otherOp: retain({ img: 'x' }) - object
    // length = min(1, 1) = 1
    // otherData = { img: 'x' }
    // transformedData = { img: 'x' } in both versions
    // No embed handler for 'img' registered... would throw
    // So register one:
    
    Delta.registerEmbed('img', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });
    
    const thisDelta = new Delta().retain(1);
    const otherDelta = new Delta().retain({ img: 'x' });
    
    const result = thisDelta.transform(otherDelta, false);
    Delta.unregisterEmbed('img');
    
    // thisData = 1 (number), otherData = { img: 'x' } (non-null object)
    // transformedData = { img: 'x' } initially
    // Embed handler block: typeof 1 === 'object' is false => block skipped
    // delta.retain({ img: 'x' })
    expect(result.ops).toEqual([{ retain: { img: 'x' } }]);
  });
});