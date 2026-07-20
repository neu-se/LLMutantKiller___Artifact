import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should correctly transform a delta with a retain and an embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      transform: (a: any, b: any, priority: boolean) => priority ? { ...a, ...b } : b,
      invert: (a: any, b: any) => ({ ...a, ...b }),
    });
    const a = new Delta().retain({ embed: { test: 'value1' } });
    const b = new Delta().retain({ embed: { test: 'value2' } });
    const expected = new Delta().retain({ embed: { test: 'value2' } });
    expect(a.transform(b)).toEqual(expected);
  });
});