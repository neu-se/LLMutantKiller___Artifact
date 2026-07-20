import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function partial application", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    const partialSink = pull((read) => read);
    const mockRead = () => {};

    // First call should work
    const firstResult = partialSink(mockRead);
    expect(firstResult).toBe(mockRead);

    // Second call should throw TypeError
    expect(() => {
      partialSink(mockRead);
    }).toThrow(TypeError);
  });
});