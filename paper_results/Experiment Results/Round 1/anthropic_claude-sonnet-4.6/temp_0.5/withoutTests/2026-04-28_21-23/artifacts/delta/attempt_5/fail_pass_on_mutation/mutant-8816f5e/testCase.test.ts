import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not call embed handler transform when thisOp is numeric retain and otherOp is embed retain', () => {
    let transformCallCount = 0;
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => {
        transformCallCount++;
        return b;
      },
    });

    try {
      const thisDelta = new Delta([{ retain: 1 }, { insert: 'a' }]);
      const otherDelta = new Delta([{ retain: { image: 'b' } }, { insert: 'c' }]);

      thisDelta.transform(otherDelta, false);

      expect(transformCallCount).toBe(0);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});