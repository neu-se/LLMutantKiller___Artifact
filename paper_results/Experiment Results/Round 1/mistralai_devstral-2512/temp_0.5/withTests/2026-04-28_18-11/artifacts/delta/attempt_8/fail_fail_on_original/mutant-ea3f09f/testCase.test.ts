import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly handle transform when thisData is object embed and otherData is number', () => {
    Delta.registerEmbed<string>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? b + a : a + b,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: 'a' });
    const b = new Delta().retain(5);
    const result = a.transform(b, true);

    expect(result.ops.length).toBe(2);
    expect(result.ops[0]).toEqual({ retain: 5 });
    expect(result.ops[1]).toEqual({ retain: { test: 'a' } });

    Delta.unregisterEmbed('test');
  });
});