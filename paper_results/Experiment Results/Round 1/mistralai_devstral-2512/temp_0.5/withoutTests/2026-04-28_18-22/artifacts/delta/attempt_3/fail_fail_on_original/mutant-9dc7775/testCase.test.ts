import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle null embed data in transform operation', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b
    });

    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: 'data2' });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: 'data2' });

    expect(result.ops).toEqual(expected.ops);
  });
});