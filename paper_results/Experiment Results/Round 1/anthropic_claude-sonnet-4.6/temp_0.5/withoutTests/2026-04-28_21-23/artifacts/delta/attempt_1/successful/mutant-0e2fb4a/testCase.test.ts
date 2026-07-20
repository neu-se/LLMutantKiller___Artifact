import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert with null retain op', () => {
  it('should handle ops with null retain without throwing', () => {
    // Create a delta with a null retain op (unusual but valid op structure)
    // The mutation changes: typeof op.retain === 'object' && op.retain !== null
    // to: typeof op.retain === 'object' && true
    // This means null retain ops would enter the embed handler branch and throw
    
    const base = new Delta().insert('hello');
    
    // Create a delta that has an op with retain: null
    // We need to directly construct ops to get null retain
    const delta = new Delta([{ retain: null as any }]);
    
    // Original: null retain skips the embed branch, returns baseIndex unchanged
    // Mutated: null retain enters embed branch, calls getEmbedTypeAndData(null, ...) which throws
    expect(() => {
      delta.invert(base);
    }).not.toThrow();
  });
});