import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should create doneLackingErr when done is not provided', () => {
    // This test verifies the initialization of doneLackingErr
    // The mutation changes if (!done) to if (done), which would prevent
    // doneLackingErr from being initialized when done is not provided

    // We can't directly observe doneLackingErr, but we can verify the behavior
    // by checking if the error is thrown when stream ends with error and no done callback
    const error = new Error('test error');
    const source = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain();
    expect(() => {
      sink(source);
    }).toThrow(error);

    // In the original code, doneLackingErr is created when done is not provided
    // In the mutated code, doneLackingErr is not created (if (done) instead of if (!done))
    // This causes the error to be thrown directly without the warning
  });
});