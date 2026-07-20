import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed handler', () => {
  it('should throw when handler is not registered for embed type', () => {
    // Create deltas with embed data but don't register handler
    const delta1 = new Delta().retain({ testEmbed: 'value1' });
    const delta2 = new Delta().retain({ testEmbed: 'value2' });

    // Original code throws error when handler not registered
    // Mutated code skips the handler check and continues
    expect(() => {
      delta1.transform(delta2, true);
    }).toThrow('no handlers for embed type "testEmbed"');
  });
});