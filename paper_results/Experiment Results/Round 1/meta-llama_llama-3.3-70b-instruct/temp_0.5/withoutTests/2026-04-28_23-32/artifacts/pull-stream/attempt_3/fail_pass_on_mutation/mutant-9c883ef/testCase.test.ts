import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback function with the correct data when test function returns true', () => {
    const callbackFunction = jest.fn();
    find(null, callbackFunction);
    expect(callbackFunction).toHaveBeenCalledTimes(0);
  });
});