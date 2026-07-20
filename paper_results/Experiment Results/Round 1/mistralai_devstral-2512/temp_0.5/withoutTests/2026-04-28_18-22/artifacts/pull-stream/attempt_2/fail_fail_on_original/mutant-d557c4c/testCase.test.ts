import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior with object streams', () => {
  it('should correctly handle object streams with source and sink methods', () => {
    const mockSink = jest.fn();
    const source = {
      source: () => 'original-source',
      sink: mockSink
    };

    const result = pull(source);

    expect(mockSink).toHaveBeenCalled();
    expect(result).toBe('original-source');
  });
});