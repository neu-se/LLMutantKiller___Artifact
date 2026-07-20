import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should correctly transform a delta with an embed and a number', () => {
    Delta.registerEmbed('embed', {
      compose: (a: number, b: number) => a + b,
      transform: (a: number, b: number, priority: boolean) => priority ? a + b : b,
      invert: (a: number, b: number) => a - b,
    });
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().retain({ embed: 1 }, { bold: true });
    expect(a.transform(b)).toEqual(expected);
  });
});