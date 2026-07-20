import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with single argument array", () => {
    const mockSink = jest.fn((read) => read);
    const testArray = [1, 2, 3];

    // This triggers the partial application path with a.length === 1
    const partialPull = pull(testArray);

    expect(partialPull).toBeInstanceOf(Function);

    // When called with a read function, it should process the array
    const result = partialPull(mockSink);

    // The original code should properly store the array in args
    // The mutated code would store an empty array instead
    expect(result).toBe(mockSink);
  });
});