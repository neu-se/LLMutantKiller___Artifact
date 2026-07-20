import Delta from "../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embed handler', () => {
  it('should correctly transform when thisOp has numeric retain and otherOp has object retain', () => {
    // Register an embed handler for testing
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    try {
      // this delta: retain 5 (numeric)
      // other delta: retain { image: { url: 'test' } } (object embed)
      const thisDelta = new Delta().retain(5);
      const otherDelta = new Delta().retain({ image: { url: 'test' } });

      // In the original code: thisData is number (5), so typeof thisData === 'object' is false
      // The whole condition is false, so transformedData stays as otherData (the object)
      // In the mutated code: typeof thisData === 'object' is false, but thisData !== null is true
      // so it tries Object.keys(thisData) on a number, which would cause issues or wrong behavior
      
      // The result should simply retain the otherData as-is since thisData is not an object
      const result = thisDelta.transform(otherDelta, false);
      
      // Expected: the object retain is preserved as-is (no embed transform applied)
      expect(result.ops).toEqual([{ retain: { image: { url: 'test' } } }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});