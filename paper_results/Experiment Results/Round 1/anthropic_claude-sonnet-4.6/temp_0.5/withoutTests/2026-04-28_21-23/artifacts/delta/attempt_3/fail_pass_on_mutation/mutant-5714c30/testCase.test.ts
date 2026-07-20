import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('does not call embed handler when this retain is numeric and other retain is object embed', () => {
    Delta.registerEmbed('video', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ mutated: true }),
    });

    try {
      // thisDelta has a numeric retain (3), otherDelta has an object retain {video: ...}
      // Original: typeof thisData === 'object' && thisData !== null && ... => false, no embed transform
      // Mutated:  typeof thisData === 'object' || thisData !== null && ... => true (since 3 !== null),
      //           embed handler IS called, returning { mutated: true }
      const thisDelta = new Delta().retain(3);
      const otherDelta = new Delta().retain({ video: { src: 'original' } });
      const result = thisDelta.transform(otherDelta, false);
      expect(result.ops).toEqual([{ retain: { video: { src: 'original' } } }]);
    } finally {
      Delta.unregisterEmbed('video');
    }
  });
});