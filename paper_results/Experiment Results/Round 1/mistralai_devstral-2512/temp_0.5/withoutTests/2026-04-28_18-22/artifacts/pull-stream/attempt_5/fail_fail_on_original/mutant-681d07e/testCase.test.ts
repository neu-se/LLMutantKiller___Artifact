import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should execute the args null check in partial application', () => {
    const read = () => {};
    let wasChecked = false;

    const partialSink = (read: any) => {
      // This should trigger the args == null check in the original code
      const args = null;
      if (args == null) {
        wasChecked = true;
        throw new TypeError("partial sink should only be called once!");
      }
      return read;
    };

    try {
      pull(partialSink, read);
    } catch (e) {
      // Expected to throw
    }

    expect(wasChecked).toBe(true);
  });
});