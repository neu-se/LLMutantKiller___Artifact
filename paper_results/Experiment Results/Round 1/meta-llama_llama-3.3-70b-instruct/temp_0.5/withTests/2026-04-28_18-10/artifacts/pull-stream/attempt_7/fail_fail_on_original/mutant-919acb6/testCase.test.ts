import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done with null when end is true', () => {
    const done = jest.fn();
    const read = (end, cb) => {
      if (end === true) {
        cb(end);
      } else {
        cb(null, null);
      }
    };
    const sink = drain(() => true, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });

  it('should call done with error when end is not true and not false', () => {
    const done = jest.fn();
    const read = (end, cb) => {
      if (end === false) {
        cb(end);
      } else {
        cb(new Error('test error'));
      }
    };
    const sink = drain(() => true, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(new Error('test error'));
  });
});