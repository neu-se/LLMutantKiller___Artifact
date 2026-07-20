import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should throw error when no handler is registered for embed type', () => {
    // Create deltas with embeds but no handler registered
    const delta1 = new Delta().retain({ test: 5 });
    const delta2 = new Delta().retain({ test: 3 });

    // This should throw an error in original code (no handler)
    // But will succeed in mutated code (if (true) bypasses handler check)
    expect(() => {
      delta1.transform(delta2, true);
    }).toThrow('no handlers for embed type "test"');
  });
});