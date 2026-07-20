import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should handle null embed value correctly', () => {
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      transform: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
    });
    const a = { test: 1 };
    const b = null;
    const delta = new Delta().insert(a);
    const result = delta.compose(new Delta().retain(b as any));
    // In original code, this should throw "cannot retain a object"
    // In mutated code, it won't throw because the condition is always false
    expect(result.ops).toEqual([{ insert: { test: 1 } }]);
    Delta.unregisterEmbed('test');
  });
});