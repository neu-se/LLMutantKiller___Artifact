import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler keepNull behavior', () => {
  it('should preserve null attributes when composing retain+retain embeds (keepNull=true for retain action)', () => {
    // Register an embed handler that uses AttributeMap-like behavior
    // The key: when action='retain', keepNull=true, so null attrs are preserved in compose
    // When mutated to action='', keepNull=false, null attrs are dropped
    
    let receivedKeepNull: boolean | undefined;

    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[], keepNull: boolean) => {
        receivedKeepNull = keepNull;
        // Return a simple composed result
        return new Delta(a).compose(new Delta(b)).ops;
      },
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) =>
        new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // This triggers the path where action === 'retain' (both ops are object retains)
      // Original: handler.compose(thisData, otherData, action === 'retain') => keepNull=true
      // Mutated:  handler.compose(thisData, otherData, action === '')        => keepNull=false
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ retain: 1, attributes: { bold: null } }] });

      a.compose(b);

      // Original code: action === 'retain' evaluates to true
      // Mutated code:  action === '' evaluates to false
      expect(receivedKeepNull).toBe(true);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});