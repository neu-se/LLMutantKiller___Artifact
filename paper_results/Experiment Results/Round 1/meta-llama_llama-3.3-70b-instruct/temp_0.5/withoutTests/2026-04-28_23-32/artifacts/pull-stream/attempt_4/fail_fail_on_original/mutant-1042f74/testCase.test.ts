const drain = require('../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain function', () => {
  it('should handle asynchronous read correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(null, null, 'data');
    });

    const doneCb = jest.fn((err) => {
      if (err) {
        done.fail('Unexpected error');
      } else {
        expect(read).toHaveBeenCalledTimes(2);
        done();
      }
    });

    const sink = drain(null, doneCb);
    sink(read);
  });
});