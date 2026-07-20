import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with custom embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should handle mismatched embed types correctly', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ otherdelta: [{ insert: 'b' }] });
    expect(() => {
      a.transform(b, true);
    }).toThrowError('embed types not matched: delta != otherdelta');
  });
});