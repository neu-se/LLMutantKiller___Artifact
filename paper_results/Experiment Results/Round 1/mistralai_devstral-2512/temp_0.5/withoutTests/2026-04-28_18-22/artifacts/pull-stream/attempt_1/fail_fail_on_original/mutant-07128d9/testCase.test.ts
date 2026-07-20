import drain from './sinks/drain.js';

describe('drain mutation test', () => {
  it('should handle error end condition correctly', (done) => {
    const error = new Error('test error');
    let errorCaught = false;

    const source = (abort, cb) => {
      if (abort) {
        cb(abort, null);
        return;
      }
      cb(error, 'data');
    };

    const sink = drain(null, (end) => {
      if (end && end !== true) {
        errorCaught = true;
        expect(end).toBe(error);
        done();
      }
    });

    sink(source);

    setTimeout(() => {
      if (!errorCaught) {
        done(new Error('Expected error was not caught'));
      }
    }, 100);
  });
});