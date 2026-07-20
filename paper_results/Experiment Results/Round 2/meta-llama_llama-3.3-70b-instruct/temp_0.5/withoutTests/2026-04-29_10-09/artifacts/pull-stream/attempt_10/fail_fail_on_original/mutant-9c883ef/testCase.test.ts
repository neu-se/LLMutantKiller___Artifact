import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle the case when no callback is provided', () => {
    const testFunction = (data: any) => data === 'test';
    const callback = jest.fn();
    find(testFunction); // original code should not call testFunction as callback
    expect(testFunction).not.toHaveBeenCalled(); // mutated code should call testFunction as callback
    find(testFunction, callback);
    find(testFunction); // mutated code should call testFunction as callback
    expect(callback).toHaveBeenCalledTimes(1); // original code calls callback
  });
});