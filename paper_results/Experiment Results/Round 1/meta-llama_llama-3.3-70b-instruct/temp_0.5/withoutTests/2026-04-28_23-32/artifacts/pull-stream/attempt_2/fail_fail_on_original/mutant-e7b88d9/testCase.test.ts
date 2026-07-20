import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

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
    const callback = jest.fn((err, data) => {
      expect(err).toBeNull();
      expect(data).toBe('test data');
    });
    result(true, callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});