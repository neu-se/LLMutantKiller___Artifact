import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when both thisData and otherData are objects with same embed type', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? b : a,
    });

    const thisDelta = new Delta([
      { retain: { test: 'value1' } },
    ]);

    const otherDelta = new Delta([
      { retain: { test: 'value2' } },
    ]);

    const result = thisDelta.transform(otherDelta, false);
    const expectedOps = [{ retain: { test: 'value1' } }];
    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});