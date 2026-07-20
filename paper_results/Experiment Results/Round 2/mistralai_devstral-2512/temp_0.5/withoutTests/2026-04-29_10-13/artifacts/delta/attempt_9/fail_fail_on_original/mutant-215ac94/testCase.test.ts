import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when both thisData and otherData are objects with different embed types', () => {
    // Register embed handlers for testing
    Delta.registerEmbed('test1', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? b : a,
    });
    Delta.registerEmbed('test2', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? b : a,
    });

    const thisDelta = new Delta([
      { retain: { test1: 'value1' } },
    ]);

    const otherDelta = new Delta([
      { retain: { test2: 'value2' } },
    ]);

    const result = thisDelta.transform(otherDelta, false);
    const expectedOps = [{ retain: { test1: 'value1' } }];
    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test1');
    Delta.unregisterEmbed('test2');
  });
});