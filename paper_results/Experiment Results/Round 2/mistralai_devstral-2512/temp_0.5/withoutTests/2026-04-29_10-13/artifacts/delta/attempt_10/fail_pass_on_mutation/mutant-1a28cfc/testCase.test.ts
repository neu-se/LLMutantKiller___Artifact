import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should handle null embed values correctly during composition', () => {
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (_a: any, b: any) => b
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain(null as any);

    // This should not throw in original code but will throw in mutated code
    expect(() => {
      delta1.compose(delta2);
    }).not.toThrow();
  });
});