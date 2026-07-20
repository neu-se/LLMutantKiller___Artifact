import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform embeds', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => {
        if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
          const aEmbed = a['embed'];
          const bEmbed = b['embed'];
          if (aEmbed !== undefined && bEmbed !== undefined) {
            return { embed: aEmbed };
          }
        }
        return b;
      },
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 1 });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});