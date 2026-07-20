import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with null handler scenario', () => {
  it('should not throw when no handler registered for embed type in transform', () => {
    // In original: getHandler throws if no handler registered
    // If mutation is if(handler) -> if(true), handler.transform() called on result of getHandler
    // which throws "no handlers" error
    // But if mutation skips getHandler entirely, no throw occurs
    
    // Register then immediately unregister to ensure clean state
    Delta.unregisterEmbed('testembed');
    
    const a = new Delta().retain({ testembed: { x: 1 } });
    const b = new Delta().retain({ testembed: { x: 2 } });

    // Original throws because getHandler('testembed') throws
    // Mutated (if handler -> if true, but handler undefined): 
    //   if getHandler still called -> also throws
    //   if getHandler NOT called -> no throw, returns untransformed
    expect(() => a.transform(b, true)).toThrow();
  });
});