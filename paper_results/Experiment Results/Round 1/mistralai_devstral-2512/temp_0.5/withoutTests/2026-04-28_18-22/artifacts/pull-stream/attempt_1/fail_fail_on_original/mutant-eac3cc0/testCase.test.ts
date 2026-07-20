const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should call done with true when op returns false', (done) => {
    let readCount = 0;
    const data = [1, 2, 3];
    const op = jest.fn((d) => {
      readCount++;
      return d !== 2; // Return false when data is 2
    });

    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
        return;
      }
      if (readCount >= data.length) {
        cb(true);
        return;
      }
      cb(null, data[readCount]);
    };

    const doneCallback = jest.fn((err) => {
      expect(err).toBeNull();
      expect(op).toHaveBeenCalledTimes(2); // Called for 1 and 2
      expect(readCount).toBe(2);
      done();
    });

    const sink = drain(op, doneCallback);
    source(null, sink);
  });
});