import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done when end is not true and not an error', () => {
    const done = jest.fn();
    const drainStream = drain((data) => {
      return data !== 2;
    }, done);

    const read = jest.fn((end, cb) => {
      cb(null, 1);
      cb(null, 2);
      cb(new Error('test error'), null);
    });

    drainStream(read);

    expect(done).toHaveBeenCalledTimes(1);
  });
});