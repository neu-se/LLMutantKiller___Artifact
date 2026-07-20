import pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('drain', () => {
  it('should call done with error when end is an error and end is not true', () => {
    const done = jest.fn();
    const drainStream = pull.drain(() => true, done);
    const read = jest.fn((end, cb) => {
      cb({ foo: 'bar' }, null);
    });
    drainStream(read);

    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith({ foo: 'bar' });
  });
});