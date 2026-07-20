import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should use registered embed handler to transform object retains of matching embed type', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown) => ({ ...(a as object), ...(b as object) }),
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ image: { x: 1 } });
    const delta2 = new Delta().retain({ image: { x: 2 } });

    // With priority=true, transform(a, b, true) returns a = { x: 1 }
    const result = delta1.transform(delta2, true);
    expect(result.ops).toEqual([{ retain: { image: { x: 1 } } }]);

    Delta.unregisterEmbed('image');
  });
});