import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 4 arguments', () => {
  it('should correctly handle 4 arguments in partial application', () => {
    const mockRead = jest.fn();
    const mockSink1 = jest.fn().mockReturnValue('sink1');
    const mockSink2 = jest.fn().mockReturnValue('sink2');
    const mockSink3 = jest.fn().mockReturnValue('sink3');
    const mockSink4 = jest.fn().mockReturnValue('sink4');

    const partial = pull(mockSink1, mockSink2, mockSink3, mockSink4);
    expect(typeof partial).toBe('function');

    const result = partial(mockRead);
    expect(result).toBe('sink4');
    expect(mockSink1).toHaveBeenCalledWith(mockRead);
    expect(mockSink2).toHaveBeenCalledWith('sink1');
    expect(mockSink3).toHaveBeenCalledWith('sink2');
    expect(mockSink4).toHaveBeenCalledWith('sink3');
  });
});