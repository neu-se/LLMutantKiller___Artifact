import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should throw error when handler is not registered for embed type', () => {
    // Create deltas with embeds but no handler registered
    const delta1 = new Delta().retain({ test: 5 });
    const delta2 = new Delta().retain({ test: 3 });

    // In original code, this should throw because no handler is registered
    // In mutated code, this will not throw because the condition is always true
    expect(() => {
      delta1.transform(delta2, true);
    }).toThrow('no handlers for embed type "test"');
  });
});