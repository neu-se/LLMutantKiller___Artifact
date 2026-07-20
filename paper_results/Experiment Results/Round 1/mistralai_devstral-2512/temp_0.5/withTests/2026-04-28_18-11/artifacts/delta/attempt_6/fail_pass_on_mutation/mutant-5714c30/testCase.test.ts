import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform() with embeds', () => {
  it('should handle object embed data correctly', () => {
    Delta.registerEmbed<{ value: number }>('test', {
      compose: (a: { value: number }, b: { value: number }) => ({ value: a.value + b.value }),
      transform: (a: { value: number }, b: { value: number }, priority: boolean) => priority ? a : b,
      invert: (a: { value: number }, b: { value: number }) => ({ value: b.value - a.value }),
    });

    const a = new Delta().retain({ test: { value: 3 } });
    const b = new Delta().retain({ test: { value: 5 } });
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { test: { value: 3 } } }]);

    Delta.unregisterEmbed('test');
  });
});