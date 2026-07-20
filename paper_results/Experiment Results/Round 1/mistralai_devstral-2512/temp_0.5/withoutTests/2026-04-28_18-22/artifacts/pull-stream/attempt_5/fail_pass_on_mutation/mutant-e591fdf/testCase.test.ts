import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior', () => {
  it('should not create partial application for non-function arguments', () => {
    const nonFunctionArg = { test: true };
    const mockSink = { sink: jest.fn(), source: jest.fn() };

    // In original code: typeof a === 'function' is false, so no partial application
    // In mutated code: true && a.length === 1 will try to access a.length on non-function
    // This should throw a TypeError in mutated code
    expect(() => {
      pull(nonFunctionArg, mockSink);
    }).not.toThrow();

    // Original behavior should process normally
    expect(mockSink.sink).toHaveBeenCalledWith(nonFunctionArg);
  });
});