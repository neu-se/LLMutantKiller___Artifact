import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('transform() with embeds', () => {
  it('should handle null embed data correctly', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a: number, b: number) => a + b,
      transform: (a: number, b: number, priority: boolean) => priority ? a : b,
      invert: (a: number, b: number) => b - a,
    });

    const a = new Delta().retain({ test: null });
    const b = new Delta().retain({ test: 5 });
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { test: 5 } }]);

    Delta.unregisterEmbed('test');
  });
});