import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when otherData is undefined', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b,
    });

    const delta1 = new Delta().retain({ test: { nested: 'value1' } });
    const delta2 = new Delta().retain(undefined);

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(undefined);

    expect(result.ops).toEqual(expected.ops);
  });
});