import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform function', () => {
  it('should correctly transform embeds when thisData and otherData are objects', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => {
        if (typeof a === 'object' && typeof b === 'object') {
          return { ...a, ...b };
        }
        return b;
      },
    });

    const a = new Delta().retain({ embed: { id: 1, value: 'test' } });
    const b = new Delta().retain({ embed: { id: 1, value: 'new test' } });
    const expected = new Delta().retain({ embed: { id: 1, value: 'new test' } });
    expect(a.transform(b)).toEqual(expected);

    Delta.unregisterEmbed('embed');
  });
});