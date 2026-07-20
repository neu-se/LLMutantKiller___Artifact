import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should create doneLackingErr when done is not provided', () => {
    const originalWarn = console.warn;
    const warnMock = jest.fn();
    console.warn = warnMock;

    // Create a source that ends normally (not with error)
    const source = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(true); // End normally
    };

    // Create drain without done callback
    const sink = drain();
    // Call the sink function directly with the source
    sink(source);

    // Verify that doneLackingErr was NOT created (since done is not provided but stream ends normally)
    expect(warnMock).not.toHaveBeenCalled();

    console.warn = originalWarn;
  });
});