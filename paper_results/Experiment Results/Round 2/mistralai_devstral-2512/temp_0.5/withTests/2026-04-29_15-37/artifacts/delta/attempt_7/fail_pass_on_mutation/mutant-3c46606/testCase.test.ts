import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        throw new Error("Handler should not be called when check fails");
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should not call handler when embed types do not match', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ other: [{ insert: 'b' }] });
    // This should not throw because handler check should fail before calling transform
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { other: [{ insert: 'b' }] } }]);
  });
});