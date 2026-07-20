import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with embed retain', () => {
  it('should handle embed retain with object type and attributes', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const delta = new Delta().retain({ delta: [{ insert: 'b' }] }, { bold: true });
    const base = new Delta().insert({ delta: [{ insert: 'a' }] }, { italic: true });

    const inverted = delta.invert(base);
    expect(inverted.ops[0].attributes?.italic).toBeDefined();
    expect(base.compose(delta).compose(inverted)).toEqual(base);

    Delta.unregisterEmbed('delta');
  });
});