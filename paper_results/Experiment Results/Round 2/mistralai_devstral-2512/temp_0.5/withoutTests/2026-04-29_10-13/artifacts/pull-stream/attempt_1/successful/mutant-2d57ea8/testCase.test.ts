import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function error message validation', () => {
  it('should throw TypeError with specific message when partial sink is called multiple times', () => {
    const partialSink = pull(function (read) {
      read(null, null);
    });

    // First call should work
    const firstRead = () => {};
    const firstResult = partialSink(firstRead);

    // Second call should throw with specific message
    const secondRead = () => {};
    expect(() => {
      partialSink(secondRead);
    }).toThrow(TypeError);

    try {
      partialSink(secondRead);
    } catch (error) {
      expect(error.message).toBe("partial sink should only be called once!");
    }
  });
});