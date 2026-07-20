import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should throw error when b is not an object', () => {
    const a = { embed: 1 };
    const b = "string";
    Delta.registerEmbed('embed', {
      compose: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
    });
    const delta = new Delta();
    delta.insert(a);
    expect(() => {
      delta.compose(new Delta().retain(b as any));
    }).toThrow();
  });
});