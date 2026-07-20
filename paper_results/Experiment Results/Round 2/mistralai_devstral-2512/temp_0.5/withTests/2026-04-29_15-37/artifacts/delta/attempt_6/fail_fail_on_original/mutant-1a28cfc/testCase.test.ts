import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should throw error when b is not an object', () => {
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      transform: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
    });
    const a = { test: 1 };
    const b = "string";
    expect(() => {
      const delta = new Delta().insert(a);
      delta.compose(new Delta().retain(b as any));
    }).toThrow('cannot retain a string');
    Delta.unregisterEmbed('test');
  });
});