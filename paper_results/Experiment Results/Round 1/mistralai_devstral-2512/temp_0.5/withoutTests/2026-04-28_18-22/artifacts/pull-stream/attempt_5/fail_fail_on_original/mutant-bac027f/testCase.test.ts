import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream source method behavior', () => {
  it('should call source method when object has source property', () => {
    const sourceObj = {
      source: jest.fn(),
      sink: jest.fn()
    };

    pull(sourceObj);

    expect(sourceObj.source).toHaveBeenCalled();
  });
});