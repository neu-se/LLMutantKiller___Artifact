const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink abort with function parameter', () => {
  it('should swap parameters when first argument is a function', () => {
    const calls: any[] = [];
    const mockRead = jest.fn((end, cb) => {
      calls.push({ end, cb });
    });

    const sink = drain(null, () => {});
    const testFunction = () => {};
    const testCallback = () => {};

    sink.abort(testFunction, testCallback);
    sink(mockRead);

    // In original code: parameters get swapped because typeof err === 'function'
    // So abort becomes testCallback and cb becomes testFunction
    // In mutated code: parameters don't get swapped because "" === typeof err is false
    // So abort becomes testFunction and cb becomes testCallback
    expect(calls[0].end).toBe(true);
    expect(typeof calls[0].cb).toBe('function');
  });
});