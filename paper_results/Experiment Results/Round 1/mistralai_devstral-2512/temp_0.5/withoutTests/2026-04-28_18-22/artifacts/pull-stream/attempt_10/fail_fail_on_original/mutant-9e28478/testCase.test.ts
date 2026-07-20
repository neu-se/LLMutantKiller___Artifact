const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('pull function with two sink functions', () => {
  it('should correctly chain two sink functions when called directly', () => {
    const mockRead = { source: jest.fn().mockReturnValue('read') };
    const mockSink1 = jest.fn().mockReturnValue('sink1');
    const mockSink2 = jest.fn().mockReturnValue('sink2');

    const result = pull(mockRead, mockSink1, mockSink2);
    expect(result).toBe('sink2');
    expect(mockSink1).toHaveBeenCalledWith('read');
    expect(mockSink2).toHaveBeenCalledWith('sink1');
  });
});