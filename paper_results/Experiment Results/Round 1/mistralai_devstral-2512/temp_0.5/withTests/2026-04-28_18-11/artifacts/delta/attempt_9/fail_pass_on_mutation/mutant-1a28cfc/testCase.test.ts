import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should handle null embed correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
    });
    const delta = new Delta();
    delta.insert({ embed: 1 });
    const result = delta.compose(new Delta().retain({ embed: 2 }));
    expect(result.ops).toEqual([{ insert: { embed: 2 } }]);
  });
});