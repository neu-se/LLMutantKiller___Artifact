const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink abort parameter handling', () => {
  it('should correctly swap parameters when first argument is a function', () => {
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
    // The key difference is what value gets passed as 'end' to read()
    expect(calls[0].end).toBe(true);
    expect(calls[0].cb).not.toBe(testCallback);
  });
});