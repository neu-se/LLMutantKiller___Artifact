import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream source method execution', () => {
  it('should execute source method when object has source property', () => {
    let sourceCalled = false;
    const sourceObj = {
      source: () => {
        sourceCalled = true;
        return () => 'data';
      },
      sink: () => {}
    };

    const result = pull(sourceObj);
    const data = result();

    expect(sourceCalled).toBe(true);
    expect(data).toBe('data');
  });
});