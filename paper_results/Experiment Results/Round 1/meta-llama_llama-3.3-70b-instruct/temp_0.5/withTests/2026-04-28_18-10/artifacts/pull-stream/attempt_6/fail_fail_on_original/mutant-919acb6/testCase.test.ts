import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('drain', () => {
  it('should call done with the error when end is not true and not false', () => {
    const done = jest.fn();
    const read = jest.fn((end, cb) => {
      if (end === null) {
        cb(null, null);
      } else if (end === false) {
        cb(false, null);
      } else {
        cb(end, null);
      }
    });
    const sink = pull.drain(() => true, done);
    sink(read);
    sink(false, () => {
      expect(done).toHaveBeenCalledTimes(1);
      expect(done).toHaveBeenCalledWith(false);
    });
    expect(() => sink(null, () => {})).toThrowError();
  });
});