import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw when partial sink is called multiple times', () => {
    const read = () => {};
    const partialSink = (read: any) => {
      let called = false;
      return (read: any) => {
        if (called) {
          throw new TypeError("partial sink should only be called once!");
        }
        called = true;
        return read;
      };
    };

    const sink = partialSink(read);
    pull(sink, read); // First call - should work
    expect(() => pull(sink, read)).toThrow(TypeError); // Second call - should throw
  });
});