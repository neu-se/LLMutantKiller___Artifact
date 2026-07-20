import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle object embed data in transform', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown) => b,
    });

    const delta1 = new Delta().retain({ test: { nested: 'value1' } });
    const delta2 = new Delta().retain({ test: { nested: 'value2' } });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: { nested: 'value2' } });

    expect(result.ops).toEqual(expected.ops);
  });
});