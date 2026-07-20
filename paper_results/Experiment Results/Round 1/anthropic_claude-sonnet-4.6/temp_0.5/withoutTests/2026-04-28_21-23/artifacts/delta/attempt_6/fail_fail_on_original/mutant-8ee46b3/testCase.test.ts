import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform where thisOp is embed retain and otherOp is number retain', () => {
    Delta.registerEmbed('img', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    // a has embed retain (length=1), b has number retain of 1
    // length = min(1,1) = 1
    // thisData = {img:{}}, otherData = 1
    // Original: typeof 1 === 'object' → false → transformedData = length = 1
    // Mutated: true → transformedData = otherData = 1
    // Same! Because otherData === length
    const a = new Delta().retain({ img: {} });
    const b = new Delta().retain(1);
    const result = a.transform(b, false);
    Delta.unregisterEmbed('img');
    expect(result.ops).toEqual([{ retain: 1 }]);
  });
});