import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed and number retain', () => {
  it('should correctly transform when thisOp has object retain and otherOp has number retain', () => {
    const embedHandler = {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({ ...a as object, ...b as object }),
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    };
    Delta.registerEmbed('image', embedHandler);

    // thisOp has object retain (embed), otherOp has number retain
    const thisDelta = new Delta().retain({ image: { id: 1 } });
    const otherDelta = new Delta().retain(1);

    // Original: condition is false (otherData is number, not object), transformedData stays as length
    // Mutated: typeof thisData === 'object' is true, enters block, Object.keys(otherData as number) causes issue
    expect(() => {
      const result = thisDelta.transform(otherDelta, false);
      // Should produce a retain of 1 (number)
      expect(result.ops).toEqual([{ retain: 1 }]);
    }).not.toThrow();

    Delta.unregisterEmbed('image');
  });
});