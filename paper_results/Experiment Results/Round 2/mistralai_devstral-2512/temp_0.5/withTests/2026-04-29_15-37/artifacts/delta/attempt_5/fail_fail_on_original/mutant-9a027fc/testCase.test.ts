import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly transform when otherData is a number', () => {
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? b : a,
      invert: (a: unknown, b: unknown) => b,
    });

    const a = new Delta().retain({ test: 5 });
    const b = new Delta().retain(3);
    const result = a.transform(b, true);
    expect(result.ops.length).toBe(2);
    expect(result.ops[0]).toEqual({ retain: { test: 3 } });
    expect(result.ops[1]).toEqual({ retain: { test: 2 } });

    Delta.unregisterEmbed('test');
  });
});