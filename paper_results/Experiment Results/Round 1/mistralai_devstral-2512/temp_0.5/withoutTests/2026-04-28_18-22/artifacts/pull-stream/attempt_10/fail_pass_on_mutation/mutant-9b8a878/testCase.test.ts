import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with 4 sinks and verify exact behavior", () => {
    const sink1 = jest.fn((read) => read);
    const sink2 = jest.fn((read) => read);
    const sink3 = jest.fn((read) => read);
    const sink4 = jest.fn((read) => read);

    // This triggers the partial application path with 4 arguments
    const partialPull = pull(sink1, sink2, sink3, sink4);

    expect(typeof partialPull).toBe('function');

    const mockRead = () => 'test';
    const result = partialPull(mockRead);

    // The original code should use the case 4 switch branch
    // The mutated code would store an empty array, causing it to hit the default case
    // This would result in different behavior that we can detect by checking the call count
    // With 4 sinks, the original should call each sink exactly once
    // The mutated version would behave differently
    expect(sink1).toHaveBeenCalledTimes(1);
    expect(sink2).toHaveBeenCalledTimes(1);
    expect(sink3).toHaveBeenCalledTimes(1);
    expect(sink4).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockRead);
  });
});