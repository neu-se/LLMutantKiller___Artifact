import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when one has null data and priority is true', () => {
    // Register an embed handler that will be called when both are objects
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        if (priority) return a;
        return b;
      }
    });

    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: 'data2' });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: null });

    expect(result.ops).toEqual(expected.ops);
  });
});