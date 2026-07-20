import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 4 arguments', () => {
  it('should correctly handle 4 arguments in partial application', () => {
    // Create a function with length 1 to trigger partial application
    const sink1 = jest.fn((read) => 'sink1');
    const sink2 = jest.fn((read) => 'sink2');
    const sink3 = jest.fn((read) => 'sink3');
    const sink4 = jest.fn((read) => 'sink4');

    // Call pull with exactly 4 functions to trigger case 4
    const partial = pull(sink1, sink2, sink3, sink4);

    // The partial should be a function
    expect(typeof partial).toBe('function');

    // Create a mock read function
    const mockRead = jest.fn();

    // Call the partial with the read function
    const result = partial(mockRead);

    // Verify the result is correct
    expect(result).toBe('sink4');

    // Verify the functions were called exactly once
    expect(sink1).toHaveBeenCalledTimes(1);
    expect(sink2).toHaveBeenCalledTimes(1);
    expect(sink3).toHaveBeenCalledTimes(1);
    expect(sink4).toHaveBeenCalledTimes(1);
  });
});