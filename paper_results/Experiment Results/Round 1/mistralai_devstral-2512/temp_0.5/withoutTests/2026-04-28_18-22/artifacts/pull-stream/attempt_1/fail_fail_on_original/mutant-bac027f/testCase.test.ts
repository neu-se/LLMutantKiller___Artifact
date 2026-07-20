import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream with source function', () => {
  it('should use source function when available', () => {
    const source = {
      source: jest.fn(() => 'source-result'),
      sink: jest.fn()
    };

    const result = pull(source);

    expect(result).toBe('source-result');
    expect(source.source).toHaveBeenCalled();
  });
});