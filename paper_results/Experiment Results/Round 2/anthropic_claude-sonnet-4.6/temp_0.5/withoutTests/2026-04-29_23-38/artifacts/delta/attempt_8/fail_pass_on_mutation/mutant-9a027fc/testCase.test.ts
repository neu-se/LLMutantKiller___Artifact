import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform with this having object retain and other having numeric retain with attributes', () => {
    Delta.registerEmbed('img', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    // this: object retain (length 1)
    // other: numeric retain 1 with attributes
    // otherData = 1 (number), length = 1
    // Original: transformedData = 1
    // Mutated: transformedData = 1
    // Same! attrs = AttributeMap.transform(undefined, {bold:true}, false) = {bold:true}
    // delta.retain(1, {bold:true}) → {retain:1, attrs:{bold:true}}
    // NOT chopped (has attributes)
    
    const a = new Delta().retain({ img: { src: 'x' } });
    const b = new Delta().retain(1, { bold: true });
    
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 1, attributes: { bold: true } }]);
    
    Delta.unregisterEmbed('img');
  });
});