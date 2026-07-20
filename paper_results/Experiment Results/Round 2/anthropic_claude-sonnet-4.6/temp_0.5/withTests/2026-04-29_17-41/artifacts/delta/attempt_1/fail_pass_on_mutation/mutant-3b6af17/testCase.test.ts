import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() mutation detection', () => {
  it('when this has numeric retain and other has embed retain, should not call embed handler with wrong types', () => {
    let transformCallCount = 0;
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        transformCallCount++;
        return new Delta(a).transform(new Delta(b), priority).ops;
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    a.transform(b, true);

    Delta.unregisterEmbed('delta');

    // The embed handler's transform should NOT be called when 'this' has a numeric retain
    expect(transformCallCount).toBe(0);
  });
});