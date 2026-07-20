const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('pull function with two arguments', () => {
  it('should correctly handle partial application with two sink functions', () => {
    const mockRead = jest.fn().mockReturnValue('read');
    const mockSink1 = jest.fn().mockReturnValue('sink1');
    const mockSink2 = jest.fn().mockReturnValue('sink2');

    const partial = pull(mockSink1, mockSink2);
    expect(typeof partial).toBe('function');

    const result = partial(mockRead);
    expect(result).toBe('sink2');
  });
});