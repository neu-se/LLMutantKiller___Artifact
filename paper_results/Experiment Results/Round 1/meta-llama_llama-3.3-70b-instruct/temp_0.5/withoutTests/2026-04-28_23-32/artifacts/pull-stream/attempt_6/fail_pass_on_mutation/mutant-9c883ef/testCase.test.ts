import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the provided callback function when test and callback are swapped', () => {
    const testFunction = jest.fn();
    const callbackFunction = jest.fn();
    find(null, testFunction);
    expect(testFunction).toHaveBeenCalledTimes(0);
    find(testFunction, callbackFunction);
    expect(callbackFunction).toHaveBeenCalledTimes(0);
    find(null, callbackFunction);
    expect(testFunction).toHaveBeenCalledTimes(0);
    find(testFunction, null);
    expect(callbackFunction).toHaveBeenCalledTimes(0);
    find(callbackFunction, null);
    expect(testFunction).toHaveBeenCalledTimes(0);
    find(null, testFunction);
    expect(callbackFunction).toHaveBeenCalledTimes(0);
  });
});