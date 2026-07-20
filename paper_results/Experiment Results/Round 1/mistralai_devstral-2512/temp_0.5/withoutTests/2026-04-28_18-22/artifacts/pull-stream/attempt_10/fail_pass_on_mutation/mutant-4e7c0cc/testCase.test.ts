import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 4 arguments', () => {
  it('should use the optimized case 4 path rather than default case', () => {
    // Create functions that will help us detect which path was taken
    const sink1 = jest.fn((read) => 'sink1');
    const sink2 = jest.fn((read) => 'sink2');
    const sink3 = jest.fn((read) => 'sink3');
    const sink4 = jest.fn((read) => 'sink4');

    // Call pull with exactly 4 functions to trigger case 4
    const partial = pull(sink1, sink2, sink3, sink4);

    // Create a mock read function
    const mockRead = jest.fn();

    // Call the partial with the read function
    const result = partial(mockRead);

    // In the original code, case 4 should return immediately
    // In the mutated code, it falls through to default case which uses apply
    // The default case would call pull with different arguments
    expect(result).toBe('sink4');

    // Verify the exact call order that case 4 should produce
    expect(sink1).toHaveBeenCalledWith(mockRead);
    expect(sink2).toHaveBeenCalledWith('sink1');
    expect(sink3).toHaveBeenCalledWith('sink2');
    expect(sink4).toHaveBeenCalledWith('sink3');

    // Verify no additional calls were made (which would happen in default case)
    expect(sink1).toHaveBeenCalledTimes(1);
    expect(sink2).toHaveBeenCalledTimes(1);
    expect(sink3).toHaveBeenCalledTimes(1);
    expect(sink4).toHaveBeenCalledTimes(1);
  });
});