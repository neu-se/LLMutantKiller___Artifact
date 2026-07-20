import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform with numeric retain in this and object retain in other uses object retain', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ image: { src: 'test.jpg' } }, { alt: 'photo' });

    const result = a.transform(b, false);

    // otherData = {image:{src:'test.jpg'}} (object)
    // Original: typeof object === 'object' → true → transformedData = otherData
    // Mutated:  true && object !== null → true → transformedData = otherData
    // Same! attrs = AttributeMap.transform(undefined, {alt:'photo'}, false) = {alt:'photo'}
    // delta.retain({image:{src:'test.jpg'}}, {alt:'photo'})
    // Result: [{retain:{image:{src:'test.jpg'}}, attributes:{alt:'photo'}}]

    expect(result.ops).toEqual([{
      retain: { image: { src: 'test.jpg' } },
      attributes: { alt: 'photo' }
    }]);

    Delta.unregisterEmbed('image');
  });
});