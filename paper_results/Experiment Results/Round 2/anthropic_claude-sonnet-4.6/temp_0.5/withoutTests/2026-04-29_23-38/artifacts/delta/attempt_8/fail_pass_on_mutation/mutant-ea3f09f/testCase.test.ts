import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform two embed retains of the same type', () => {
    Delta.registerEmbed('video', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        if (priority) {
          return a;
        }
        return b;
      },
    });

    try {
      const thisDelta = new Delta().retain({ video: { url: 'original.mp4' } });
      const otherDelta = new Delta().retain({ video: { url: 'other.mp4' } });

      // With priority=true, transform should return thisData (a)
      const result = thisDelta.transform(otherDelta, true);

      expect(result.ops).toEqual([
        { retain: { video: { url: 'original.mp4' } } },
      ]);
    } finally {
      Delta.unregisterEmbed('video');
    }
  });
});