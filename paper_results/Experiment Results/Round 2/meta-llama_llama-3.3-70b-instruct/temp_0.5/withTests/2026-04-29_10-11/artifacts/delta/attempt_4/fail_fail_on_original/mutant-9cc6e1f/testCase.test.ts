import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform embeds correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => Object.keys(a)[0] === Object.keys(b)[0] ? { [Object.keys(a)[0]]: a[Object.keys(a)[0]] } : { [Object.keys(a)[0]]: a[Object.keys(a)[0]], [Object.keys(b)[0]]: b[Object.keys(b)[0]] },
      transform: (a, b, priority) => Object.keys(a)[0] === Object.keys(b)[0] ? { [Object.keys(a)[0]]: a[Object.keys(a)[0]] } : { [Object.keys(a)[0]]: a[Object.keys(a)[0]], [Object.keys(b)[0]]: b[Object.keys(b)[0]] },
      invert: (a, b) => Object.keys(a)[0] === Object.keys(b)[0] ? { [Object.keys(a)[0]]: a[Object.keys(a)[0]] } : { [Object.keys(a)[0]]: a[Object.keys(a)[0]], [Object.keys(b)[0]]: b[Object.keys(b)[0]] },
    });
    const a = new Delta().insert({ embed: { foo: 'bar' } });
    const b = new Delta().retain({ embed: { foo: 'baz' } });
    const expected = new Delta().retain({ embed: { foo: 'bar' } });
    expect(a.transform(b)).toEqual(expected);
  });
});