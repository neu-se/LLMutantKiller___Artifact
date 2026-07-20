import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform()', () => {
  it('should handle retain with embed and object correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ embed: { ...a, ...b } }),
      transform: (a, b, priority) => ({ embed: { ...a, ...b } }),
      invert: (a, b) => ({ embed: { ...a, ...b } }),
    });
    const a = new Delta().retain({ embed: { foo: 'bar' } });
    const b = new Delta().retain({ embed: { foo: 'baz' } });
    const expected = new Delta().retain({ embed: { foo: 'baz' } });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});