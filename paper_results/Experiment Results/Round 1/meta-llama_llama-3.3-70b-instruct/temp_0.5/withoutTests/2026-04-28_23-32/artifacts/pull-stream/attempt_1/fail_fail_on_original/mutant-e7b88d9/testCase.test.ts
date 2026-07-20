import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should call the callback with the correct value when ended and end are true', () => {
    const test = jest.fn();
    const read = jest.fn((end, cb) => {
      if (end) {
        cb(null, 'test data');
      } else {
        cb(null, 'test data');
      }
    });
    const takeFunction = take(1, { last: true });
    const result = takeFunction(read);
    result(true, (err, data) => {
      expect(read).toHaveBeenCalledTimes(1);
      expect(read).toHaveBeenCalledWith(true, expect.any(Function));
    });
  });
});