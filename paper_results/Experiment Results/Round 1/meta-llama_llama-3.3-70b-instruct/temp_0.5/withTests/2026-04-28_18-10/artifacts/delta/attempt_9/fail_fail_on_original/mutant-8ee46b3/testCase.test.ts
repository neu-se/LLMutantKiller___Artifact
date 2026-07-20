import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle transform with two embeds correctly when embed handler is registered', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ embed: a }),
      transform: (a, b) => ({ embed: b }),
      invert: (a, b) => ({ embed: a }),
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});