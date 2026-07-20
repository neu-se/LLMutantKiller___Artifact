import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw TypeError when partial sink is called more than once', () => {
    const partialSink = (read) => {
      // First call should work
      const firstResult = pull(partialSink, read);
      // Second call should throw
      expect(() => pull(partialSink, read)).toThrow(TypeError);
    };

    const read = () => {};
    expect(() => pull(partialSink, read)).not.toThrow();
  });
});