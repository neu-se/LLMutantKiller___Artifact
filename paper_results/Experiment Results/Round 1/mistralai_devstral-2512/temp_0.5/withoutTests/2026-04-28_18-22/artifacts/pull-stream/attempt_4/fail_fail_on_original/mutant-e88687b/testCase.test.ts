const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink abort with function parameter', () => {
  it('should swap parameters when first argument is a function', () => {
    let callbackReceivedErr: any = null;
    let callbackReceivedCb: any = null;

    const mockRead = jest.fn((end, cb) => {
      callbackReceivedErr = end;
      callbackReceivedCb = cb;
    });

    const sink = drain(null, () => {});
    const testFunction = () => {};
    const testCallback = () => {};

    sink.abort(testFunction, testCallback);
    sink(mockRead);

    // In original code: parameters get swapped because typeof err === 'function'
    // So mockRead should receive (testCallback, testFunction)
    // In mutated code: parameters don't get swapped because "" === typeof err is false
    // So mockRead should receive (testFunction, testCallback)
    expect(mockRead).toHaveBeenCalledWith(testCallback, testFunction);
  });
});