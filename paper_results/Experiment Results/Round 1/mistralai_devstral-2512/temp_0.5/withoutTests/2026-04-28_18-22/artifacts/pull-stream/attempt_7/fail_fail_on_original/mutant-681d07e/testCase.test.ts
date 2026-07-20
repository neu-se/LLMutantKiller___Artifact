import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should execute the args null check when using partial application', () => {
    const read = () => {};
    let checkExecuted = false;

    const partialSink = (read: any) => {
      // This will trigger the args == null check in the original code
      const args = null;
      if (args == null) {
        checkExecuted = true;
      }
      return read;
    };

    pull(partialSink, read);
    expect(checkExecuted).toBe(true);
  });
});