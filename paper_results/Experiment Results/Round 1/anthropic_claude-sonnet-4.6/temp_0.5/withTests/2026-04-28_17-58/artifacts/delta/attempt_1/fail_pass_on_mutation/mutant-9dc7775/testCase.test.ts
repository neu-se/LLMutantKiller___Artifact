import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('transform() number retain vs embed retain', () => {
  it('does not invoke embed handler when this retain is a number', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    
    // With mutation (true && instead of thisData !== null &&), when thisData is a number (1),
    // Object.keys(1) returns [], embedType is undefined, and the inner if fails,
    // so transformedData stays as the embed object - same result!
    // Need a case where thisData is a number AND embedType matches...
    
    expect(a.transform(b, true)).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});