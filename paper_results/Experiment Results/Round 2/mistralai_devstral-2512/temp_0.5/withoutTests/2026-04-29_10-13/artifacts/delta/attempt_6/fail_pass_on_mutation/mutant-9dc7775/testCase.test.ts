import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should handle null embed data correctly in transform', () => {
    const embedType = 'custom';
    Delta.registerEmbed(embedType, {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        if (a === null) return { transformed: true };
        return priority ? a : b;
      }
    });

    const delta1 = new Delta().retain({ [embedType]: null });
    const delta2 = new Delta().retain({ [embedType]: { value: 1 } });

    const result = delta1.transform(delta2, true);

    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    expect(result.ops[0].retain).toEqual({ [embedType]: { transformed: true } });

    Delta.unregisterEmbed(embedType);
  });
});