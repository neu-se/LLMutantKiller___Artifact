import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior', () => {
  it('should handle null argument without throwing', () => {
    const mockSink = { sink: jest.fn(), source: jest.fn() };

    // In original code: typeof null === 'function' is false, so no partial application
    // In mutated code: true && null.length === 1 will throw TypeError
    expect(() => {
      pull(null, mockSink);
    }).not.toThrow();

    // Original behavior should process normally
    expect(mockSink.sink).toHaveBeenCalledWith(null);
  });
});