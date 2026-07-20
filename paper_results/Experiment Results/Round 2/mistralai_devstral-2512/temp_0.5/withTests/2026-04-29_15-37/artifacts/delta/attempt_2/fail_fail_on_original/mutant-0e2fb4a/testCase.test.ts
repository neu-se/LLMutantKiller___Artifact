import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with null retain object', () => {
  it('should throw error when retain is null object', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const delta = new Delta().retain(null as unknown as { delta: Op[] }, { bold: true });
    const base = new Delta().insert({ delta: [{ insert: 'a' }] }, { bold: false });

    expect(() => {
      delta.invert(base);
    }).toThrow();

    Delta.unregisterEmbed('delta');
  });
});