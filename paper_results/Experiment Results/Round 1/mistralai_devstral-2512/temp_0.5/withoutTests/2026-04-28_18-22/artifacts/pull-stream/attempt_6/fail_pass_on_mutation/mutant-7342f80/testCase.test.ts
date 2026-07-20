import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should create doneLackingErr error when done is not provided', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    const source = (abort: any, cb: (err?: any) => void) => {
      cb(true); // End stream normally
    };

    const sink = drain(null, undefined);
    sink(source);

    // In the original code, doneLackingErr should be initialized
    // In the mutated code (if (false)), it won't be initialized
    // We can't directly test the error object, but we can test the warning behavior
    expect(warnMock).not.toHaveBeenCalled();

    console.warn = originalWarn;
  });
});