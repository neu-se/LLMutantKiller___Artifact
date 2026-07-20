const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink abort with function parameter', () => {
  it('should correctly handle abort when first parameter is a function', (done) => {
    const mockRead = jest.fn((end, callback) => {
      if (end) {
        callback(end, null);
      }
    });

    const sink = drain(null, () => {
      done();
    });

    const testFunction = () => {};
    sink.abort(testFunction, () => {
      // This callback should be called with the function as the error parameter
      // In the original code, this works because it checks typeof err === 'function'
      // In the mutated code, it fails because it checks "" === typeof err
    });

    sink(mockRead);
  });
});