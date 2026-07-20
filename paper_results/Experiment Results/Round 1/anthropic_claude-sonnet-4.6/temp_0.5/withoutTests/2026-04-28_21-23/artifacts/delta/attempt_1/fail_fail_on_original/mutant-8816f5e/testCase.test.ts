import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with mixed retain types', () => {
  it('should correctly transform when one delta retains an embed and the other retains a number at the same position', () => {
    // Register a simple embed handler
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    try {
      // thisOp has an embed retain (object), otherOp has a number retain
      // In original: condition requires BOTH to be objects, so embed handler NOT called
      // transformedData = length (1)
      // In mutated: condition triggers when thisData is object OR otherData is object
      // so it tries to call handler with mismatched types
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } });
      const otherDelta = new Delta().retain(1);

      // In original code: transformedData = length = 1 (number retain)
      // In mutated code: tries to get embedType from thisData (object), finds 'image',
      // checks if otherData also has 'image' key - it doesn't (it's a number), so no handler called
      // Actually let me reconsider...

      const result = thisDelta.transform(otherDelta, false);
      
      // With original: transformedData = length = 1, result is retain(1)
      expect(result.ops).toEqual([{ retain: 1 }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});