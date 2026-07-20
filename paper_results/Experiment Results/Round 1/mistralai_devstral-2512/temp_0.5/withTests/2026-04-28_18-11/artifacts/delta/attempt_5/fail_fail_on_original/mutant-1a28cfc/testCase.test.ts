import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should throw error when b is not an object', () => {
    const a = { embed: 1 };
    const b = "string";
    Delta.registerEmbed('embed', {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
    });
    expect(() => {
      const delta = new Delta();
      delta.insert(a);
      delta.compose(new Delta().retain(b as any));
    }).toThrowError('cannot retain a string');
  });
});