import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior', () => {
  it('should not enter partial application mode when first argument is not a function', () => {
    const nonFunctionArg = {};
    const mockSink = { sink: jest.fn(), source: jest.fn() };

    // In the original code, this should NOT create a partial application
    // because the first argument is not a function
    const result = pull(nonFunctionArg, mockSink);

    // The mutation changes the condition to always be true (if true && a.length === 1)
    // which would incorrectly enter partial application mode even for non-functions
    // This would cause the function to return a function instead of processing normally
    expect(typeof result).not.toBe('function');
    expect(mockSink.sink).toHaveBeenCalledWith(nonFunctionArg);
  });
});