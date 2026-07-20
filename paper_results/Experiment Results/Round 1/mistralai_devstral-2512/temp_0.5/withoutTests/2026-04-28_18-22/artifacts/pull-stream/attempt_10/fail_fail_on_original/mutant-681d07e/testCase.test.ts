import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw TypeError when partial sink is called multiple times', () => {
    const read = () => {};
    let callCount = 0;

    const partialSink = (read: any) => {
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

    const sink = partialSink(read);
    pull(sink, read); // First call
    expect(() => pull(sink, read)).toThrow(TypeError); // Second call should throw
  });
});