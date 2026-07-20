import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error callback correctly', (done) => {
    let callbackCalled = false;
    let callbackError: boolean | null = null;
    const testCallback = (err: boolean | null, data: any) => {
      callbackCalled = true;
      callbackError = err;
      done();
    };

    const stream = find(testCallback);
    stream(true);

    expect(callbackCalled).toBe(true);
    expect(callbackError).toBe(true);
  });
});