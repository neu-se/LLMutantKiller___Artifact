import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should not call the test function as the callback when no callback is provided', () => {
    const testFunction = jest.fn();
    find(testFunction);
    expect(testFunction).not.toHaveBeenCalledWith(null, expect.any(Function));
  });
});