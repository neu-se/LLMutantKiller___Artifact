import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should swap test and callback when no callback is provided', () => {
    const testFunction = () => {};
    const callbackFunction = jest.fn();
    find(testFunction, null);
    expect(() => find(testFunction, null)).not.toThrow();
    find(testFunction, callbackFunction);
    find(null, testFunction);
    expect(callbackFunction).toHaveBeenCalledTimes(0);
    find(testFunction, null);
    const testSpy = jest.spyOn(global, 'console');
    find(testFunction, null);
    expect(testSpy.log).not.toHaveBeenCalled();
  });
});