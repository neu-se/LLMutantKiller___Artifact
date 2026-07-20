const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink abort parameter handling', () => {
  it('should correctly identify function parameter in abort', () => {
    const mockRead = jest.fn();
    const sink = drain(null, () => {});

    // Test with a function as first parameter
    const testFn = () => {};
    sink.abort(testFn, () => {});

    // In original code: typeof err === 'function' → true
    // In mutated code: "" === typeof err → false
    // This causes different behavior in parameter swapping
    expect(mockRead).not.toHaveBeenCalled();

    // Now trigger the read to verify the abort was processed correctly
    sink(mockRead);
    expect(mockRead).toHaveBeenCalled();
  });
});