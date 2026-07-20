import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly transform when both operations have embed retains with priority', () => {
    Delta.registerEmbed<string>('test', {
      compose: (a: string, b: string) => a + b,
      transform: (a: string, b: string, priority: boolean) => priority ? b + a : a + b,
      invert: (a: string, b: string) => b,
    });

    const a = new Delta().retain({ test: 'a' });
    const b = new Delta().retain({ test: 'b' });
    const result = a.transform(b, true);

    expect(result.ops).toEqual([{ retain: { test: 'ba' } }]);

    Delta.unregisterEmbed('test');
  });
});