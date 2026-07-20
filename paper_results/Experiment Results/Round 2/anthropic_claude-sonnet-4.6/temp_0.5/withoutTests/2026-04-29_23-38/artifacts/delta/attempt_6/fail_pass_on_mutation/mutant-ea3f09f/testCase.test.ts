import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should use embed handler transform result when both retains are embed objects', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        // Return a specific merged result
        return { merged: true, priority };
      },
    });

    try {
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } });
      const otherDelta = new Delta().retain({ image: { src: 'b.png' } });

      const result = thisDelta.transform(otherDelta, true);

      expect(result.ops).toEqual([
        { retain: { image: { merged: true, priority: true } } },
      ]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});