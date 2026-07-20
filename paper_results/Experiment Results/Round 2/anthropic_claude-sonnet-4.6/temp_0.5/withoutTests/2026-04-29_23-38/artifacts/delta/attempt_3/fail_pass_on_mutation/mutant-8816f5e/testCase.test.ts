import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not invoke embed handler when thisOp has numeric retain and otherOp has object retain', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({}),
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean): never => {
        throw new Error('should not be called');
      },
    });

    try {
      // thisOp: numeric retain 1
      const thisDelta = new Delta().retain(1).insert('x');
      // otherOp: object retain (embed)
      const otherDelta = new Delta().retain({ image: { src: 'a.png' } }).insert('y');
      const result = thisDelta.transform(otherDelta, false);
      expect(result.ops).toEqual([{ retain: { image: { src: 'a.png' } } }, { insert: 'y' }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});