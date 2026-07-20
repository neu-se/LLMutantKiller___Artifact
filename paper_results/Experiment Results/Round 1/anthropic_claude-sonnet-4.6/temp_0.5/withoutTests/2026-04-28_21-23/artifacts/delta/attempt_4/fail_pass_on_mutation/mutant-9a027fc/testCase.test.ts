import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transforms with priority when other has object retain and this has number retain', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b,
    });

    try {
      // this: retain(3) - number retain, length 3
      // other: retain({image: {src: 'x'}}) - object retain, length 1
      // length = min(3, 1) = 1
      // thisOp = {retain: 1}, otherOp = {retain: {image: {src: 'x'}}}
      // thisData = 1 (number), otherData = {image: {src: 'x'}} (object)
      // Original: typeof object === 'object' && != null → true → transformedData = {image: {src: 'x'}}
      // Mutated: true && object != null → true → transformedData = {image: {src: 'x'}}
      // Embed handler NOT invoked (thisData is number)
      // Both: delta.retain({image: {src: 'x'}})
      // Then: thisIter at retain(2), otherIter exhausted
      // Both produce: retain({image: {src: 'x'}})
      const a = new Delta().retain(3);
      const b = new Delta().retain({ image: { src: 'x' } });
      const result = a.transform(b, true);
      expect(result).toEqual(new Delta().retain({ image: { src: 'x' } }));
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});