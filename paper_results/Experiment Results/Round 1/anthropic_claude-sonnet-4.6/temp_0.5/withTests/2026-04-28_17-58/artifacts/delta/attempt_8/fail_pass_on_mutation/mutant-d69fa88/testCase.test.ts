import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert()', () => {
  it('invert of retain with number should not enter embed branch even when mutation changes condition', () => {
    // The mutation changes typeof op.retain === 'object' to true
    // For numeric retains, branch 3 catches them before branch 4
    // So the mutation should not affect numeric retains
    // But for ops with non-object, non-null retain that bypass branch 3...
    // The only such case: op.retain is undefined (empty op)
    // Let's test this specific case
    
    // Op with retain: undefined (no retain property), no delete, no insert
    // This reaches branch 4 in mutated code (true && undefined !== null = true)
    // But in original code, typeof undefined === 'object' is false -> skips
    
    // The question is: does the mutated code throw or return empty delta?
    // If the embed code is dead (after return in branch 3), both return empty delta
    // If the embed code is alive (sibling else-if), mutated throws
    
    // Based on my analysis, the embed code is alive (sibling else-if)
    // So the mutated code should throw for {} op
    // But my tests show it doesn't...
    
    // Let me try a different approach: test the actual embed invert functionality
    // to determine if the embed code is alive or dead
    
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const delta = new Delta().retain({ delta: [{ insert: 'b' }] });
    const base = new Delta().insert({ delta: [{ insert: 'a' }] });
    const expected = new Delta().retain({ delta: [{ delete: 1 }] });
    
    const inverted = delta.invert(base);
    
    // If this passes, embed code is alive
    // If this fails (inverted is empty), embed code is dead
    expect(inverted).toEqual(expected);
    
    Delta.unregisterEmbed('delta');
  });
});