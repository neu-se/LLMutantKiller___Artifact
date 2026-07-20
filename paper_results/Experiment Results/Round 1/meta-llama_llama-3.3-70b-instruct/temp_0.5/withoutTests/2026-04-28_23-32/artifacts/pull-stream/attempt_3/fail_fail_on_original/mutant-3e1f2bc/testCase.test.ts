import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle non-object sinks correctly', () => {
    const read = () => {};
    const sink = 'string';
    expect(() => pull({ source: read }, sink)).toThrowError(TypeError);
  });
});