import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should throw error when handler is not registered for embed type', () => {
    // Create deltas with embed data but don't register handler
    const delta1 = new Delta().retain({ test: 'data1' });
    const delta2 = new Delta().retain({ test: 'data2' });

    // Original code should throw error when handler is not registered
    // Mutated code will skip the handler check and not throw
    expect(() => {
      delta1.transform(delta2, true);
    }).toThrow('no handlers for embed type "test"');
  });
});