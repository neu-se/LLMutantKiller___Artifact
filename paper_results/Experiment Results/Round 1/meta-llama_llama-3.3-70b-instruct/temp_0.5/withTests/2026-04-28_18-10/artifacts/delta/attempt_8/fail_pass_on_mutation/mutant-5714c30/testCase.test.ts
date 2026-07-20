import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform()', () => {
  it('should handle retain with embed and object correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => b,
      transform: (a, b, priority) => b,
      invert: (a, b) => b,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});