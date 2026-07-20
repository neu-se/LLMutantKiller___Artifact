import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should correctly handle null thisData in embed transform', () => {
    let transformCalled = false;
    let transformPriority: boolean | undefined;

    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        transformCalled = true;
        transformPriority = priority;
        return [{ retain: { delta: [{ insert: 'transformed' }] } }];
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);

    Delta.unregisterEmbed('delta');

    // Original code: transform should NOT be called (thisData is null)
    // Mutated code: transform WILL be called (condition changed to true)
    expect(transformCalled).toBe(false);
    expect(transformPriority).toBeUndefined();
    expect(result.ops).toEqual([{ retain: { delta: [{ insert: 'b' }] } }]);
  });
});