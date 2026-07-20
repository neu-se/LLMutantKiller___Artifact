const drain = require('./sinks/drain');

describe('drain function', () => {
  it('should handle asynchronous read correctly', (done) => {
    const read = jest.fn((err, cb) => {
      cb(null, false, 'data');
    });

    const doneCb = jest.fn((err) => {
      if (err) {
        done.fail('Unexpected error');
      } else {
        expect(read).toHaveBeenCalledTimes(1);
        done();
      }
    });

    const sink = drain(null, doneCb);
    sink(read);
  });
});