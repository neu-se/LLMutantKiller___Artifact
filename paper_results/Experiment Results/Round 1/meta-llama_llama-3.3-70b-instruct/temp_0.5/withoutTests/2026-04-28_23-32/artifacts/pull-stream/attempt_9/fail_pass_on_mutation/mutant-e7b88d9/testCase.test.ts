import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should call the callback with the correct value when ended and end are true', async () => {
    const read = jest.fn((end: boolean, cb: (err: null, data: string) => void) => {
      if (end) {
        cb(null, 'test data');
      } else {
        cb(null, 'test data');
      }
    });
    const takeFunction = take(1);
    const result = takeFunction(read);
    let callbackCalled = false;
    await new Promise((resolve) => {
      result(true, (err: null, data: string) => {
        callbackCalled = true;
        expect(err).toBeNull();
        expect(data).toBe('test data');
        resolve();
      });
    });
    expect(callbackCalled).toBe(true);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenNthCalledWith(1, true, expect.any(Function));
  });
});