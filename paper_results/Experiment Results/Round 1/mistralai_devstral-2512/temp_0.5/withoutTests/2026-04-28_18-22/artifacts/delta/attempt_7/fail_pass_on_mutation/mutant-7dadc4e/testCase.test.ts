import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when otherData is an object and thisData is not', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b,
    });

    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain({ test: { nested: 'value2' } });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: { nested: 'value2' } });

    expect(result.ops).toEqual(expected.ops);
  });
});