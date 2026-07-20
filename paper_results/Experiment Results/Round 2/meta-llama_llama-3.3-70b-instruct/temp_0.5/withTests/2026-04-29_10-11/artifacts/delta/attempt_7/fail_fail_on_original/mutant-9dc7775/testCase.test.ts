import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should correctly transform a delta with a retain and an embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      transform: (a: any, b: any, priority: boolean) => priority ? { ...a, ...b } : b,
      invert: (a: any, b: any) => ({ ...a, ...b }),
    });
    const a = new Delta().retain(1, { bold: true });
    const b = new Delta().retain({ embed: { test: 'value' } });
    const expected = new Delta().retain({ embed: { test: 'value' } }, { bold: true });
    expect(a.transform(b)).toEqual(expected);
  });
});