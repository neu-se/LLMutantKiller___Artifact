import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform embeds correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ embed: { foo: 'bar' } }),
      transform: (a, b, priority) => ({ embed: { foo: 'bar' } }),
      invert: (a, b) => ({ embed: { foo: 'bar' } }),
    });
    const a = new Delta().insert({ embed: { foo: 'bar' } });
    const b = new Delta().retain({ embed: { foo: 'baz' } });
    const expected = new Delta().retain({ embed: { foo: 'bar' } });
    expect(a.transform(b)).toEqual(expected);
  });
});