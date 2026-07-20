import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback when no callback is provided and test is a function', () => {
    const testFunction = (data: any) => data === 'test';
    const callback = jest.fn();
    find(testFunction, callback);
    expect(callback).toHaveBeenCalledTimes(0); // original code doesn't call callback when no data is provided
    find(testFunction); // mutated code should call testFunction as callback
    expect(testFunction).toHaveBeenCalledTimes(1); // mutated code calls testFunction as callback
  });
});