import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform function', () => {
  it('should correctly handle embeds when thisData and otherData are objects', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => ({ ...a, ...b }),
      invert: (a, b) => a,
      transform: (a, b, priority) => b,
    });

    const a = new Delta().retain({ embed: { id: 1, value: 'test' } });
    const b = new Delta().retain({ embed: { id: 1, value: 'new test' } });
    const expected = new Delta().retain({ embed: { id: 1, value: 'new test' } });
    expect(a.transform(b)).toEqual(expected);

    const c = new Delta().retain({ embed: { id: 1, value: 'test' } });
    const d = new Delta().retain({ embed: { id: 1, value: 'new test', extra: 'field' } });
    const expected2 = new Delta().retain({ embed: { id: 1, value: 'new test', extra: 'field' } });
    expect(c.transform(d)).toEqual(expected2);

    Delta.unregisterEmbed('embed');
  });
});