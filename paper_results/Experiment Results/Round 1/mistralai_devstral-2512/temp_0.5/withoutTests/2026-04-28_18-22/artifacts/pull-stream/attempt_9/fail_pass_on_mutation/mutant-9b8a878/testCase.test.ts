import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with multiple sinks and verify behavior", () => {
    let callOrder = [];
    const sink1 = jest.fn((read) => { callOrder.push(1); return read; });
    const sink2 = jest.fn((read) => { callOrder.push(2); return read; });
    const sink3 = jest.fn((read) => { callOrder.push(3); return read; });

    // This triggers the partial application path with 3 arguments
    const partialPull = pull(sink1, sink2, sink3);

    expect(typeof partialPull).toBe('function');

    const mockRead = () => 'test';
    const result = partialPull(mockRead);

    // The original code should call all sinks in order
    // The mutated code would store an empty array, causing different behavior
    expect(callOrder).toEqual([1, 2, 3]);
    expect(result).toBe(mockRead);
  });
});