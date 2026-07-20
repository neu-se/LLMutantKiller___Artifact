import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should correctly handle embed transformation when thisData is a number and otherData is an embed', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(5);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });

    const result = a.transform(b, true);

    // The mutation changes the condition from checking if thisData is an object
    // to always being true, which means it will incorrectly try to transform
    // when thisData is a number (5) and otherData is an embed object
    // This should fail on the mutated code because it will try to access
    // properties on a number that don't exist
    expect(result.ops.length).toBe(1);
    expect(typeof result.ops[0].retain).toBe('number');
    expect(result.ops[0].retain).toBe(5);

    Delta.unregisterEmbed('delta');
  });
});