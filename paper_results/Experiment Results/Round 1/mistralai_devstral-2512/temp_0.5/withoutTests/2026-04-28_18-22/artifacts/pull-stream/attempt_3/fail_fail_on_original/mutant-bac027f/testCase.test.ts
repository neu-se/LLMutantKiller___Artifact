import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream source function behavior', () => {
  it('should handle object with source method correctly', () => {
    const sourceObj = {
      source: jest.fn(() => 'source-result'),
      sink: jest.fn()
    };

    const result = pull(sourceObj);

    expect(result).toBe('source-result');
    expect(sourceObj.source).toHaveBeenCalled();
  });
});