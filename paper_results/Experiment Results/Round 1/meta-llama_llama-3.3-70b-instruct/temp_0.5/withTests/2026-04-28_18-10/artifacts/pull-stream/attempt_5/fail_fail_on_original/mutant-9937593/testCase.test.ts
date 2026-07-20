import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('drain', () => {
  it('should call done with error when end is an error', () => {
    const done = jest.fn();
    const drainStream = drain(() => true, done);

    const read = jest.fn((end, cb) => {
      cb(new Error('test error'), null);
    });

    drainStream(read);

    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(new Error('test error'));
  });
});