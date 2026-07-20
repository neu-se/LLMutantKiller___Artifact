import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform() with embeds', () => {
  it('should handle null embed data in transform with mixed operations', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a: number, b: number) => a + b,
      transform: (a: number, b: number, priority: boolean) => priority ? a : b,
      invert: (a: number, b: number) => b - a,
    });

    const a = new Delta().retain({ test: null }).insert('test');
    const b = new Delta().retain({ test: 5 }).delete(1);
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { test: null } }, { delete: 1 }]);

    Delta.unregisterEmbed('test');
  });
});