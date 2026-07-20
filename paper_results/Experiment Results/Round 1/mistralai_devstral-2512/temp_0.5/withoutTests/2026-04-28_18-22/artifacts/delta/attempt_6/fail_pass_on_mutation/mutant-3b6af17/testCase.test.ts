import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when both deltas have object retains', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain({ test: 'value2' });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: 'value2' });

    expect(result.ops).toEqual(expected.ops);
  });
});