import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle non-object retain data during transform', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain({ test: 'value' });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: 'value' });

    expect(result.ops).toEqual(expected.ops);
  });
});