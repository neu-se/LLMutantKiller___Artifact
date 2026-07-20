import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should execute the args null check in the original code', () => {
    const read = () => {};
    let checkExecuted = false;

    // Create a function that matches the partial sink pattern
    const partialSink = (read: any) => {
      checkExecuted = true;
      return read;
    };

    // This should trigger the args null check path in the original code
    pull(partialSink, read);

    // In the original code, the args null check should execute
    // In the mutated code (if false), it won't execute
    expect(checkExecuted).toBe(true);
  });
});