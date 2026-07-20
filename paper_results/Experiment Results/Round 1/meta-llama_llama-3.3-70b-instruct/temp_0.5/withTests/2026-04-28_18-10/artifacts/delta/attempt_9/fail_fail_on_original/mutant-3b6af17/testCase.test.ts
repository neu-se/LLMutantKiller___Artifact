import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform function', () => {
  it('should correctly handle embeds when thisData and otherData are objects', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => ({ ...a, ...b }),
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

    const c = new Delta().retain({ embed: { id: 2, value: 'test' } });
    const d = new Delta().retain({ embed: { id: 1, value: 'new test' } });
    expect(() => c.transform(d)).toThrowError('embed types not matched: embed != embed');

    Delta.unregisterEmbed('embed');
  });
});