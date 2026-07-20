import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should throw error when b is not an object', () => {
    const a = { embed: 1 };
    const b = "string";
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any) => b,
      transform: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
    });
    expect(() => {
      const delta = new Delta();
      delta.insert(a);
      delta.compose(new Delta().retain(b as any));
    }).toThrowError('cannot retain a string');
  });
});