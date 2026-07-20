import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with array argument", () => {
    const testArray = [1, 2, 3];
    const mockSink = jest.fn((read) => read);

    // This triggers the partial application path with a.length === 1
    const partialPull = pull(testArray);

    expect(typeof partialPull).toBe('function');

    // When called with a read function, it should process the array
    const result = partialPull(mockSink);

    // The original code should properly store the array in args
    // The mutated code would store an empty array, causing it to not process the array
    // This would result in mockSink not being called with the array
    expect(mockSink).toHaveBeenCalledWith(testArray);
  });
});