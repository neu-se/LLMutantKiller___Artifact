import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with multiple sinks", () => {
    const sink1 = jest.fn((read) => read);
    const sink2 = jest.fn((read) => read);
    const sink3 = jest.fn((read) => read);

    // This triggers the partial application path
    const partialPull = pull(sink1, sink2, sink3);

    expect(typeof partialPull).toBe('function');

    // When called with a read function, it should process all sinks
    const mockRead = () => 'test';
    const result = partialPull(mockRead);

    // The original code should properly store all 3 sinks in args
    // The mutated code would store an empty array, causing incorrect behavior
    expect(sink1).toHaveBeenCalled();
    expect(sink2).toHaveBeenCalled();
    expect(sink3).toHaveBeenCalled();
  });
});