import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should call the callback with the correct value when ended and end are true', () => {
    const read = jest.fn((end, cb) => {
      if (end) {
        cb(null, 'test data');
      } else {
        cb(null, 'test data');
      }
    });
    const takeFunction = take(1);
    const result = takeFunction(read);
    let ended = false;
    const callback = jest.fn((err, data) => {
      expect(err).toBeNull();
      expect(data).toBe('test data');
    });
    result(false, (err, data) => {
      ended = true;
      result(true, (err, data) => {
        expect(ended).toBe(true);
        expect(data).toBe('test data');
      });
    });
    expect(read).toHaveBeenCalledTimes(2);
    expect(read).toHaveBeenNthCalledWith(1, false, expect.any(Function));
    expect(read).toHaveBeenNthCalledWith(2, true, expect.any(Function));
    expect(callback).toHaveBeenCalledTimes(0);
  });
});