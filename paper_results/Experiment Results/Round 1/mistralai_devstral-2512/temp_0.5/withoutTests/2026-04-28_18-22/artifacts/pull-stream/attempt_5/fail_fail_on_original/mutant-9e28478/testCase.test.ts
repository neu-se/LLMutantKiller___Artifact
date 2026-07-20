const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('pull function with two sink functions', () => {
  it('should return a function when called with two sink functions', () => {
    const mockSink1 = jest.fn();
    const mockSink2 = jest.fn();

    const result = pull(mockSink1, mockSink2);
    expect(typeof result).toBe('function');
    expect(result.length).toBe(1);
  });
});