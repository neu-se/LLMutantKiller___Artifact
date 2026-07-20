import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should throw an error when no callback is provided and the test function is not a function', () => {
    expect(() => find('not a function')).toThrowError();
  });
});