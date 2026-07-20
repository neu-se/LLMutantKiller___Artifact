import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('correctly transforms when both ops have matching embed type object retains', () => {
    Delta.registerEmbed('img', {
      compose: (a: unknown, b: unknown, _keepNull: boolean) => ({ ...(a as object), ...(b as object) }),
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ url: 'transformed' }),
    });

    try {
      // Both this and other have object retains with same embed type
      // Both original and mutated should call the handler
      const thisDelta = new Delta([{ retain: { img: { url: 'original' } } }]);
      const otherDelta = new Delta([{ retain: { img: { url: 'other' } } }]);
      const result = thisDelta.transform(otherDelta, false);
      expect(result.ops).toEqual([{ retain: { img: { url: 'transformed' } } }]);
    } finally {
      Delta.unregisterEmbed('img');
    }
  });
});