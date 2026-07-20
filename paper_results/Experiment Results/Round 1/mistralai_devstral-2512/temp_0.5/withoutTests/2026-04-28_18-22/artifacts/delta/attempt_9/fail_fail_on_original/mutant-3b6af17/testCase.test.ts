import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when both deltas have object retains with different embed types', () => {
    // Register two different embed handlers
    Delta.registerEmbed('test1', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a
    });

    Delta.registerEmbed('test2', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta().retain({ test1: 'value1' });
    const delta2 = new Delta().retain({ test2: 'value2' });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test1: 'value1' });

    expect(result.ops).toEqual(expected.ops);
  });
});