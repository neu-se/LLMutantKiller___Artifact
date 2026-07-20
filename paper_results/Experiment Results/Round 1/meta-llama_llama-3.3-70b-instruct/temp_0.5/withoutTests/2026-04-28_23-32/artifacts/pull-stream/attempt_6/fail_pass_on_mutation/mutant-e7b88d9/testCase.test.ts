import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should call the callback with the correct value when ended and end are true', () => {
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
    const callback = jest.fn((err: null, data: string) => {
      expect(err).toBeNull();
      expect(data).toBe('test data');
    });
    result(true, callback);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenNthCalledWith(1, true, expect.any(Function));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});