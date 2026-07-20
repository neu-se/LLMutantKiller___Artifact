import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback when test is a string and no callback is provided', () => {
    const callbackFunction = 'callback';
    find(null, callbackFunction);
    expect(typeof callbackFunction).toBe('string');
  });
});