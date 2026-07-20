import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should throw error when b is null', () => {
    Delta.registerEmbed('embed', {
      compose: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
    });
    const delta = new Delta();
    delta.insert({ embed: 1 });
    expect(() => {
      delta.compose(new Delta().retain(null as any));
    }).toThrowError('cannot retain a object');
  });
});