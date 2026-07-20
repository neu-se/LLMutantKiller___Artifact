import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform() with embeds', () => {
  it('should handle null embed data in transform with priority false', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a: number, b: number) => a + b,
      transform: (a: number, b: number, priority: boolean) => priority ? a : b,
      invert: (a: number, b: number) => b - a,
    });

    const a = new Delta().retain({ test: null });
    const b = new Delta().retain({ test: 5 });
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: { test: 5 } }]);

    Delta.unregisterEmbed('test');
  });
});