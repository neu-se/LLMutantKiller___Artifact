import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain mutation test', () => {
  it('should handle error end condition correctly', (done) => {
    const error = new Error('test error');
    let errorCaught = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort, null);
        return;
      }
      cb(error, 'data');
    };

    const sink = drain(null, (end: any) => {
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