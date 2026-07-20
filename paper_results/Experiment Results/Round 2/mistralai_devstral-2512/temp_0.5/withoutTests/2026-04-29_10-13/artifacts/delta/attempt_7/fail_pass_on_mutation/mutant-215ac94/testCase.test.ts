import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is a number and otherData is an object', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? b : a,
    });

    const thisDelta = new Delta([
      { retain: 5 },  // Number retain
    ]);

    const otherDelta = new Delta([
      { retain: { test: 'value' } },  // Object retain
    ]);

    const result = thisDelta.transform(otherDelta, true);
    const expectedOps = [{ retain: { test: 'value' } }];
    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});