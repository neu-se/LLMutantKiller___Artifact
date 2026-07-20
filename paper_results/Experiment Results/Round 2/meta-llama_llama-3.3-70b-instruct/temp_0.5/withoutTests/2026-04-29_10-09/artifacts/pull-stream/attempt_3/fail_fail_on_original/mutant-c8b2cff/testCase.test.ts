import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call read with the correct abort value when op returns false', (done) => {
    const readSpy = jest.fn((abort, cb) => {
      if (abort !== (abort === true)) {
        throw new Error('Expected abort to be equal to itself');
      }
      cb(null, 'data');
    });
    const doneSpy = jest.fn();
    const opSpy = jest.fn(() => false);
    const sink = drain(opSpy, doneSpy);
    sink(readSpy);
    sink.abort(false);
    expect(readSpy).toHaveBeenCalledTimes(1);
    expect(readSpy).toHaveBeenCalledWith(false, expect.any(Function));
    done();
  });
});