import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

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
    expect(read).toHaveBeenCalledTimes(1);
  });
});