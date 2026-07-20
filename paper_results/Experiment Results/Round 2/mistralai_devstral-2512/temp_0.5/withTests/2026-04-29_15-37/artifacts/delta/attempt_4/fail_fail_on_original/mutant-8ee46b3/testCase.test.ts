import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('transform() with embeds', () => {
  it('should correctly transform embeds when otherData is not an object', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().retain({ delta: [{ insert: 'a' }] }, { bold: true });
    const result = a.transform(b, true);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});