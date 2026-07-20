import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with object retain', () => {
  it('should correctly handle object retain with null value in base', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const delta = new Delta().retain({ delta: [{ insert: 'b' }] }, { bold: true });
    const base = new Delta().insert({ delta: null } as unknown as { delta: Op[] }, { bold: false });

    // The mutation changes the condition from `op.retain !== null` to `true`
    // This means the code will now try to process null values that should be skipped
    // In the original code, this should throw an error when trying to process null
    // In the mutated code, it will try to process the null value and likely fail differently
    expect(() => {
      delta.invert(base);
    }).toThrow();

    Delta.unregisterEmbed('delta');
  });
});