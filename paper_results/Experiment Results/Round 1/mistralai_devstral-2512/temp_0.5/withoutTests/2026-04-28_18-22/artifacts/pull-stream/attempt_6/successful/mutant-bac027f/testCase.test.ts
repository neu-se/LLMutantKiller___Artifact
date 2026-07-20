import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream source method behavior', () => {
  it('should use source method when object has source property', () => {
    const sourceObj = {
      source: () => 'source-result',
      sink: () => {}
    };

    const result = pull(sourceObj);
    const data = result();

    expect(data).toBe('source-result');
  });
});