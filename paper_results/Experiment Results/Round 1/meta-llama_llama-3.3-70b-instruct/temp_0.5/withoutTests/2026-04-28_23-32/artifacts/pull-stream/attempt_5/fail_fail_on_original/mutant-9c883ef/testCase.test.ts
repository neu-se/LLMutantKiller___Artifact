import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should swap test and callback when callback is null', () => {
    const callbackFunction = jest.fn();
    const testFunction = 'test';
    find(testFunction, null);
    expect(callbackFunction).not.toHaveBeenCalled();
    find(testFunction, callbackFunction);
    expect(callbackFunction).toHaveBeenCalledTimes(0);
    find(null, testFunction);
    expect(testFunction).toHaveBeenCalledTimes(0);
  });
});