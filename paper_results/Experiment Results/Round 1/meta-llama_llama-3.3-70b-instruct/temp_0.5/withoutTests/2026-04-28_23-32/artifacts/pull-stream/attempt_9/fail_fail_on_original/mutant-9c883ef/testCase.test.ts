import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should throw an error when no callback is provided and test is not a function', () => {
    expect(() => find('test', null)).toThrow();
  });
});