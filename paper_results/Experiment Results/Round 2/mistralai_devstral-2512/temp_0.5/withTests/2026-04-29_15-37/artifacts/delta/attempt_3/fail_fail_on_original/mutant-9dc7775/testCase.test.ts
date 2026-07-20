import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should throw error when transforming string with embed retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().insert('a');
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(() => {
      a.transform(b, true);
    }).toThrowError('cannot retain a string');

    Delta.unregisterEmbed('delta');
  });
});