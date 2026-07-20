import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error callback correctly', (done) => {
    let callbackCalled = false;
    let callbackError = null;
    const testCallback = (err: any, data: any) => {
      callbackCalled = true;
      callbackError = err;
      done();
    };

    const read = (err: any, cb: (end: any, data: any) => void) => {
      if (err) cb(err, null);
    };
    const stream = find(testCallback);
    read(true, (err, data) => {
      expect(callbackCalled).toBe(true);
      expect(callbackError).toBe(true);
    });
  });
});