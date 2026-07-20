import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with multiple arguments", () => {
    const mockRead = jest.fn((source) => source);
    const sink1 = jest.fn((read) => read);
    const sink2 = jest.fn((read) => read);

    const partialPull = pull(sink1, sink2);

    expect(partialPull).toBeInstanceOf(Function);
    expect(() => partialPull(mockRead)).not.toThrow();

    // Verify the partial application was called correctly
    expect(mockRead).toHaveBeenCalled();
  });
});