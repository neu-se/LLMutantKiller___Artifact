const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink abort parameter swapping', () => {
  it('should correctly swap parameters when first argument is a function', () => {
    const results: any[] = [];
    const mockRead = jest.fn((end, cb) => {
      results.push({ end, cb });
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
    expect(results[0].end).toBe(testCallback);
    expect(results[0].cb).toBe(testFunction);
  });
});