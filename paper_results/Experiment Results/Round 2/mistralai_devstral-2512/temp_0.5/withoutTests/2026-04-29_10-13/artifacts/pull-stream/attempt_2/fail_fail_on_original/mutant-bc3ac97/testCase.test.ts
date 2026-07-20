import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should correctly handle the case with 3 arguments', () => {
    const mockRead = jest.fn();
    const mockSink = jest.fn();
    const mockSource = jest.fn(() => mockRead);

    const stream = {
      sink: mockSink,
      source: mockSource
    };

    const result = pull(mockRead, stream, (read: any) => {
      return (end: any, cb: any) => {
        read(end, cb);
      };
    });

    expect(mockSink).toHaveBeenCalledWith(mockRead);
    expect(mockSource).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});