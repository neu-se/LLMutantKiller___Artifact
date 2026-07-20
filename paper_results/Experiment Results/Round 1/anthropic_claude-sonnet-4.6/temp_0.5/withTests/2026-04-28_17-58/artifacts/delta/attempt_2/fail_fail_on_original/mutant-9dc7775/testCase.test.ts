import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('transform()', () => {
  it('handles retain null correctly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // Force thisData to be null by directly setting ops
    const a = new Delta();
    (a as any).ops = [{ retain: null }];
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    
    // Original: thisData !== null is false, skip embed block, return retain unchanged
    // Mutated: true, enter embed block, Object.keys(null) throws
    const result = a.transform(b, false);
    expect(result).toEqual(new Delta().retain({ delta: [{ insert: 'b' }] }));

    Delta.unregisterEmbed('delta');
  });
});