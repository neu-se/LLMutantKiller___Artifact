import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle null embed data in transform operation with priority', () => {
    // Register an embed handler that will be called when both are objects
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        if (priority) return a;
        return b;
      }
    });

    const delta1 = new Delta().retain({ test: 'data1' });
    const delta2 = new Delta().retain({ test: null });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: 'data1' });

    expect(result.ops).toEqual(expected.ops);
  });
});