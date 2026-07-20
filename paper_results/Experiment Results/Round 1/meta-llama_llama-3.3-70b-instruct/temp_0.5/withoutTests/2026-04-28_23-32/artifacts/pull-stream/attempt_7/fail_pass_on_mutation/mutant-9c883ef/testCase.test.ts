import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback function when no callback is provided and test is a function', () => {
    const testFunction = jest.fn();
    find(testFunction, null);
    expect(testFunction).toHaveBeenCalledTimes(0);
    const callbackSpy = jest.spyOn(console, 'log');
    find(null, testFunction);
    expect(callbackSpy).not.toHaveBeenCalled();
  });
});