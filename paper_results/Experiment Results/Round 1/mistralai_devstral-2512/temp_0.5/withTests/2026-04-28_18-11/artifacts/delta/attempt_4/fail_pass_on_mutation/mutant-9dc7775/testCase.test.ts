import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should correctly handle null thisData in embed transform', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        // This handler will only be called if the condition is met
        return new Delta(a).transform(new Delta(b), priority).ops;
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);

    Delta.unregisterEmbed('delta');

    // The original code should not call the handler (thisData is null)
    // The mutated code will incorrectly call the handler
    expect(result.ops).toEqual([{ retain: { delta: [{ insert: 'b' }] } }]);
  });
});