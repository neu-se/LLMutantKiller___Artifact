import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform embeds', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => {
        if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null && Object.keys(a)[0] === Object.keys(b)[0]) {
          return a;
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