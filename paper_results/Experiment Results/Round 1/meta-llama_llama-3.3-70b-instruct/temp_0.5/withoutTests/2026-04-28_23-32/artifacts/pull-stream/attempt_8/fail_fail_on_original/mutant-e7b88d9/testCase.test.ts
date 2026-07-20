import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should call the callback with the correct value when ended and end are true', (done) => {
    const read = jest.fn((end: boolean, cb: (err: null, data: string) => void) => {
      if (end) {
        cb(null, 'test data');
      } else {
        cb(null, 'test data');
      }
    });
    const takeFunction = take(1);
    const result = takeFunction(read);
    let ended = true;
    let callbackCalled = false;
    result(true, (err, data) => {
      callbackCalled = true;
      expect(err).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
    setTimeout(() => {
      expect(callbackCalled).toBe(true);
    }, 10);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenNthCalledWith(1, true, expect.any(Function));
  });
});