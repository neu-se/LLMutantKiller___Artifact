import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('drain', () => {
  it('should call done with error when end is not true and not an error', () => {
    const err = new Error('test error');
    const done = jest.fn();
    const drainStream = pull.drain((data) => {
      if (data === 2) {
        throw err;
      }
    }, done);

    const read = jest.fn((end, cb) => {
      cb(null, 1);
      cb(null, 2);
    });

    read(null, (end, data) => {
      drainStream(end, data);
    });

    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(err);
  });
});