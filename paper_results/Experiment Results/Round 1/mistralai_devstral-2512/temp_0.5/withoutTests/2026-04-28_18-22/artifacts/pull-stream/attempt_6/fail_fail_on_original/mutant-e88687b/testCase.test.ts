const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink abort parameter handling', () => {
  it('should correctly handle function parameter in abort', () => {
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
    // So abort should be set to testCallback and cb should be testFunction
    // In mutated code: parameters don't get swapped because "" === typeof err is false
    // So abort should be set to testFunction and cb should be testCallback
    expect(results[0].end).toBe(true);
    expect(results[0].cb).toBe(testCallback);
  });
});