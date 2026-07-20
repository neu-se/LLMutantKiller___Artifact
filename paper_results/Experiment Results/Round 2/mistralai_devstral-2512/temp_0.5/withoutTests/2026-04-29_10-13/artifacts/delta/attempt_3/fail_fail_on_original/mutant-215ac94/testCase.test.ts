import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is not an object but otherData is', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a,
    });

    const thisDelta = new Delta([
      { retain: 5 },  // Non-object retain
    ]);

    const otherDelta = new Delta([
      { retain: { test: 'value' } },  // Object retain
    ]);

    const result = thisDelta.transform(otherDelta, false);
    const expectedOps = [{ retain: 5 }];
    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});