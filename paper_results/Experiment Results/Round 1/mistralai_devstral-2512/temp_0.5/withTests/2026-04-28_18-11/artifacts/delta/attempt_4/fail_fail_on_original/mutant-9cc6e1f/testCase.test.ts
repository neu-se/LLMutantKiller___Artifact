import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should handle embed type mismatch during transform', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        if (typeof a === 'object' && typeof b === 'object') {
          const aKeys = Object.keys(a);
          const bKeys = Object.keys(b);
          if (aKeys.length > 0 && bKeys.length > 0 && aKeys[0] !== bKeys[0]) {
            throw new Error(`embed types not matched: ${aKeys[0]} != ${bKeys[0]}`);
          }
        }
        return new Delta(a).transform(new Delta(b), priority).ops;
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ other: [{ insert: 'b' }] });

    expect(() => {
      a.transform(b, true);
    }).toThrowError('embed types not matched: delta != other');

    Delta.unregisterEmbed('delta');
  });
});