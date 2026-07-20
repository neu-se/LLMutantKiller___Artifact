import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior with object streams', () => {
  it('should correctly handle object streams with source and sink methods', () => {
    const mockSink = jest.fn();
    const source = {
      source: () => 'original-source',
      sink: mockSink
    };

    const result = pull(source);

    // The original code should return the source function
    expect(typeof result).toBe('function');
    // The sink should not be called for objects without a function type
    expect(mockSink).not.toHaveBeenCalled();

    // Now test with a non-object argument that would trigger the mutation
    const nonObject = "not an object";
    const result2 = pull(() => 'source', nonObject);
    expect(typeof result2).toBe('function');
  });
});