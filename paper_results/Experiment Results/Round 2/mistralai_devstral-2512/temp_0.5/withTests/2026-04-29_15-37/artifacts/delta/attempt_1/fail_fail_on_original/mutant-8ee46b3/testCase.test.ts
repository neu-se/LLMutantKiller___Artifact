import Delta from '../../src/Delta';
import Op from '../../src/Op';

describe('transform() with embeds', () => {
  it('should correctly transform embeds when otherData is not an object', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1);
    const expected = new Delta().retain({ delta: [{ insert: 'a' }] });
    const result = a.transform(b, true);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});