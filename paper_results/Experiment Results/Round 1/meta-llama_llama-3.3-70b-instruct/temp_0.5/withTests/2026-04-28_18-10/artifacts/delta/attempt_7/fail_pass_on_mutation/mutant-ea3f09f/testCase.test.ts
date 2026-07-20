import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly with embeds', () => {
    Delta.registerEmbed('delta', {
      compose: (a: any, b: any) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: any, b: any, priority: boolean) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: any, b: any) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ retain: 1 }, { insert: 'b' }] });
    expect(a.transform(b, true)).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});