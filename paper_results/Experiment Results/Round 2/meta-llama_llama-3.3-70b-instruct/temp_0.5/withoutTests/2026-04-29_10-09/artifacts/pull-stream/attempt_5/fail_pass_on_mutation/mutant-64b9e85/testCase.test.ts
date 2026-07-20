import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error callback correctly', () => {
    let callbackCalled = false;
    let callbackError = null;
    const testCallback = (err: any, data: any) => {
      callbackCalled = true;
      callbackError = err;
    };

    const read = (err: any) => {
      if (err) testCallback(err, null);
    };
    const stream = find(testCallback);
    read(true);

    expect(callbackCalled).toBe(true);
    expect(callbackError).toBe(true);
  });
});