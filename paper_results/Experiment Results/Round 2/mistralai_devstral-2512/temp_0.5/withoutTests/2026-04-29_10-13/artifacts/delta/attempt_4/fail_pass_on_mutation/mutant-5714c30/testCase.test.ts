import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is null and otherData is object', () => {
    // Register a simple embed handler
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => {
        if (a === null) return b;
        return priority ? a : b;
      },
    });

    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: { value: 'test' } });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: { value: 'test' } });

    expect(result.ops).toEqual(expected.ops);
  });
});