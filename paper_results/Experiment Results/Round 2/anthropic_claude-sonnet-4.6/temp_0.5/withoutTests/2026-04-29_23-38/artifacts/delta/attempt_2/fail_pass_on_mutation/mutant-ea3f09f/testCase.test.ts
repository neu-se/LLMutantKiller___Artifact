import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform when thisOp retains an embed and otherOp retains a number', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    try {
      // thisOp retains an embed object, otherOp retains a plain number
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } });
      const otherDelta = new Delta().retain(1);

      // In original: otherData is a number, so typeof otherData === 'object' is false,
      // embed handler is skipped, transformedData = length = 1
      // In mutated: the check is replaced with true, so it tries Object.keys on a number
      // which returns [], embedType = undefined, handler lookup throws
      expect(() => {
        thisDelta.transform(otherDelta, false);
      }).not.toThrow();
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});