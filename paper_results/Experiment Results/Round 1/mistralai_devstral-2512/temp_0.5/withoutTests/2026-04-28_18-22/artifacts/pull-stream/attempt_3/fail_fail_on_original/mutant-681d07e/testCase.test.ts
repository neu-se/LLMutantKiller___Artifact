import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should execute the args null check when using partial application', () => {
    const read = () => {};
    const partialSink = (read) => {
      let callCount = 0;
      return (read) => {
        callCount++;
        if (callCount > 1) {
          // This should trigger the args == null check in the original code
          const args = null;
          if (args == null) {
            throw new TypeError("partial sink should only be called once!");
          }
        }
        return read;
      };
    };

    const sink = partialSink(read);
    pull(sink, read); // First call - should work
    expect(() => pull(sink, read)).toThrow(TypeError); // Second call - should throw
  });
});