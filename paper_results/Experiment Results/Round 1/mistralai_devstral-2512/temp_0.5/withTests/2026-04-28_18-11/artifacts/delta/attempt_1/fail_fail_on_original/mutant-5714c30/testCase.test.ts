import Delta from '../../src/Delta';

describe('transform() with embeds', () => {
  it('should handle null embed data correctly', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b - a,
    });

    const a = new Delta().retain({ test: null });
    const b = new Delta().retain({ test: 5 });
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { test: 5 } }]);

    Delta.unregisterEmbed('test');
  });
});