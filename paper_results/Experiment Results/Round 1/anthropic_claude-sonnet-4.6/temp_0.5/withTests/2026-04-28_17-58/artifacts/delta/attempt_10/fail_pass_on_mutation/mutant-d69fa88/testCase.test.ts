import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert()', () => {
  it('invert retain number with attributes does not call embed handler', () => {
    let embedCalled = false;
    Delta.registerEmbed<string>('test', {
      compose: (a: string, b: string) => b,
      invert: (a: string, b: string) => { embedCalled = true; return b; },
      transform: (a: string, b: string, priority: boolean) => b,
    });
    
    // Numeric retain with attributes - goes to branch 3, NOT embed branch
    const delta = new Delta().retain(1, { bold: true });
    const base = new Delta().insert('a');
    delta.invert(base);
    
    // In mutated code: true && 1 !== null = true, but branch 3 catches numeric retains first
    // So embed handler should NOT be called in either version
    expect(embedCalled).toBe(false);
    
    Delta.unregisterEmbed('test');
  });
});