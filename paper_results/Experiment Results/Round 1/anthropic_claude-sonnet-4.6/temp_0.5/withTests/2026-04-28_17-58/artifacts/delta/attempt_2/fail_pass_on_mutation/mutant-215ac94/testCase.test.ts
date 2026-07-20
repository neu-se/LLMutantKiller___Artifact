import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('handles null retain in thisOp without throwing', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
    
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ retain: { delta: [{ insert: 'b' }] } }]);
    
    expect(() => a.transform(b, true)).not.toThrow();
    
    Delta.unregisterEmbed('delta');
  });
});