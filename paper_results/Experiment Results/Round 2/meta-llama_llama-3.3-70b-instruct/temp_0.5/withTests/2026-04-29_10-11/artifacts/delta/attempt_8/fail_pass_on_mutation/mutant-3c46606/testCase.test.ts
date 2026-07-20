import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Delta', () => {
  it('transform with embed handler', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const c = new Delta().retain({ delta: [{ insert: 'c' }] });
    const expected = new Delta().retain({ delta: [{ retain: 1 }, { insert: 'b' }] });
    expect(a.transform(b, true)).toEqual(expected);
    expect(a.transform(c, true)).toEqual(new Delta().retain({ delta: [{ retain: 1 }, { insert: 'c' }] }));

    Delta.unregisterEmbed('delta');
  });
});