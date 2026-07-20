import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior', () => {
  it('should handle non-function first argument correctly', () => {
    const nonFunctionArg = {};
    const mockSink = { sink: jest.fn(), source: jest.fn() };
    const mockRead = jest.fn();

    // This should not throw and should process the arguments normally
    const result = pull(nonFunctionArg, mockSink, mockRead);

    // In the original code, since nonFunctionArg is not a function,
    // it won't enter the partial application branch and will process normally
    expect(mockSink.sink).toHaveBeenCalledWith(nonFunctionArg);
    expect(mockRead).not.toHaveBeenCalled();
  });
});