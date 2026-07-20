import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is object and otherData is not', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain(3);

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: 'value1' });

    expect(result.ops).toEqual(expected.ops);
  });
});