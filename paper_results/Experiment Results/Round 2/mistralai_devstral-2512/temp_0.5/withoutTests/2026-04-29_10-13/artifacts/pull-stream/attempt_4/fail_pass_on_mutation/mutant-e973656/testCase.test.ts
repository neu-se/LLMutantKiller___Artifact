const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should handle end with truthy non-true value correctly', (done) => {
    const error = new Error('test error');
    let readCalled = false;

    const source = (abort, cb) => {
      readCalled = true;
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, (end) => {
      expect(end).toBe(error);
      expect(readCalled).toBe(true);
      done();
    });

    sink(source);
  });
});