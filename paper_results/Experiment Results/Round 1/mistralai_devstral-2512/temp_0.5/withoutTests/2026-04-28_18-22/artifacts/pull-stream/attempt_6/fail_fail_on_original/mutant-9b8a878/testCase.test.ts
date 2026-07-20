import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with 5 arguments", () => {
    const sink1 = jest.fn((read) => read);
    const sink2 = jest.fn((read) => read);
    const sink3 = jest.fn((read) => read);
    const sink4 = jest.fn((read) => read);
    const sink5 = jest.fn((read) => read);

    // This triggers the partial application path with 5 arguments
    const partialPull = pull(sink1, sink2, sink3, sink4, sink5);

    expect(typeof partialPull).toBe('function');

    const mockRead = () => 'test';
    const result = partialPull(mockRead);

    // The original code should use the default case with unshift
    // The mutated code would store an empty array, causing different behavior
    // We can detect this by checking the call order and arguments
    expect(sink1).toHaveBeenCalledBefore(sink2);
    expect(sink2).toHaveBeenCalledBefore(sink3);
    expect(sink3).toHaveBeenCalledBefore(sink4);
    expect(sink4).toHaveBeenCalledBefore(sink5);
  });
});