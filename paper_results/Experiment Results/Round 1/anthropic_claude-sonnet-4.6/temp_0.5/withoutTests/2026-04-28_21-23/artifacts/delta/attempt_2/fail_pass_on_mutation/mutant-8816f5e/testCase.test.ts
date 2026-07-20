import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle embed transform correctly when both ops retain embeds of same type', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => ({ transformed: true }),
    });

    try {
      // Both deltas retain the same embed type
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } });
      const otherDelta = new Delta().retain({ image: { src: 'b.png' } });

      const result = thisDelta.transform(otherDelta, false);
      // Should call handler.transform and get { image: { transformed: true } }
      expect(result.ops).toEqual([{ retain: { image: { transformed: true } } }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});