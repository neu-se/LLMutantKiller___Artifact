const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('pull function partial application', () => {
  it('should correctly handle partial application with two sink functions', () => {
    const mockRead = jest.fn().mockReturnValue('read');
    const mockSink1 = jest.fn().mockReturnValue('sink1');
    const mockSink2 = jest.fn().mockReturnValue('sink2');

    // Call pull with two sink functions to trigger partial application
    const partial = pull(mockSink1, mockSink2);

    // The partial function should be callable
    expect(typeof partial).toBe('function');

    // Calling the partial function should execute the chain
    const result = partial(mockRead);

    // Verify the chain executed correctly
    expect(result).toBe('sink2');
    expect(mockSink1).toHaveBeenCalledWith(mockRead);
    expect(mockSink2).toHaveBeenCalledWith('sink1');
  });
});