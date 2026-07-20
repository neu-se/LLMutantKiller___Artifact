import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle embeds correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => {
        if (typeof a === 'object' && typeof b === 'object') {
          return { embed: a.embed + b.embed };
        }
        return b;
      },
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 3 });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});