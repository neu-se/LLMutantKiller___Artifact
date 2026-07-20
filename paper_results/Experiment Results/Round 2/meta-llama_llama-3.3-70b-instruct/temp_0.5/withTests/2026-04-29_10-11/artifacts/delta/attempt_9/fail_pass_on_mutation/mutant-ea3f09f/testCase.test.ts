import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle embeds correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b) => {
        if (typeof a === 'object' && a !== null) {
          return { embed: a.embed + 1 };
        }
        return b;
      },
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});