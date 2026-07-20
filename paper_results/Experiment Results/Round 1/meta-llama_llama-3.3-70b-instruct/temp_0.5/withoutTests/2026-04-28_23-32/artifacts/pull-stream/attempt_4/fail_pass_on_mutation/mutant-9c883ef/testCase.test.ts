import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback function when no callback is provided', () => {
    const testFunction = () => true;
    find(testFunction, null);
    expect(() => find(testFunction, null)).not.toThrow();
  });
});