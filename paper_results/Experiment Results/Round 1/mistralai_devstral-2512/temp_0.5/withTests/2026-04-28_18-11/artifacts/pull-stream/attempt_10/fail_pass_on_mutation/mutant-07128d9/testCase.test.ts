const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('drain mutation test', () => {
  it('should handle stream end with truthy non-true value correctly', (done) => {
    const error = new Error('test error');
    let callbackCalled = false;

    const sink = pull.drain(null, (err: any) => {
      callbackCalled = true;
      expect(err).toBe(error);
      done();
    });

    const source = (abort: any, cb: any) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    pull(
      source,
      sink
    );
  });
});