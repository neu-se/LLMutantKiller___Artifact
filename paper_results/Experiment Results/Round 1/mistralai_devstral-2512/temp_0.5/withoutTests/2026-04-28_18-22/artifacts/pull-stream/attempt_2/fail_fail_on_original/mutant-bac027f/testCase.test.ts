import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream source handling', () => {
  it('should call source function when object has source method', () => {
    const sourceObj = {
      source: jest.fn(() => 'mock-source'),
      sink: jest.fn()
    };

    const through = jest.fn((read) => {
      return 'through-result';
    });

    const result = pull(sourceObj, through);

    expect(sourceObj.source).toHaveBeenCalled();
    expect(through).toHaveBeenCalled();
    expect(result).toBe('through-result');
  });
});