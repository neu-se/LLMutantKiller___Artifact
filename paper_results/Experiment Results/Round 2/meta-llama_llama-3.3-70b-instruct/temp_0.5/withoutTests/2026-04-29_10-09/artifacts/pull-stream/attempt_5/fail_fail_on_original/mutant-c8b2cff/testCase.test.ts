import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call read with abort equal to the abort value passed to abort', (done) => {
    const readSpy = jest.fn((abort, cb) => {
      if (abort !== false) {
        throw new Error('Expected abort to be false');
      }
      cb(null, 'data');
    });
    const doneSpy = jest.fn();
    const opSpy = jest.fn(() => false);
    const sink = drain(opSpy, doneSpy);
    sink(readSpy);
    sink.abort(false);
    expect(readSpy).toHaveBeenCalledTimes(1);
    done();
  });
});