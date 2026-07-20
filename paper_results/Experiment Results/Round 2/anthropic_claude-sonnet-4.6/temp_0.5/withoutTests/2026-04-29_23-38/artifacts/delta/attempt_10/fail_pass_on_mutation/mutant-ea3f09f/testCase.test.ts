import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transforms embed retain against embed retain of same type using handler', () => {
    Delta.registerEmbed('custom', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        const aVal = (a as any).value;
        const bVal = (b as any).value;
        return { value: priority ? Math.max(aVal, bVal) : Math.min(aVal, bVal) };
      },
    });

    try {
      const thisDelta = new Delta()
        .retain({ custom: { value: 10 } })
        .insert('x');
      const otherDelta = new Delta()
        .retain({ custom: { value: 5 } })
        .insert('y');

      const resultNoPriority = thisDelta.transform(otherDelta, false);
      // Without priority: transform returns min(10,5) = 5
      expect(resultNoPriority.ops[0]).toEqual({
        retain: { custom: { value: 5 } },
      });

      const resultWithPriority = thisDelta.transform(otherDelta, true);
      // With priority: transform returns max(10,5) = 10
      expect(resultWithPriority.ops[0]).toEqual({
        retain: { custom: { value: 10 } },
      });
    } finally {
      Delta.unregisterEmbed('custom');
    }
  });
});