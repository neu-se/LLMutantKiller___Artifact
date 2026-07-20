import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should not call the test function as the callback when a callback is provided', () => {
    const testFunction = jest.fn();
    const callback = jest.fn();
    find(testFunction, callback);
    expect(testFunction).not.toHaveBeenCalledWith(null, expect.any(Function));
    find(testFunction); // mutated code should call testFunction as callback
    expect(callback).toHaveBeenCalledTimes(0); // original code calls callback
  });
});