import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call read with the correct abort value when op returns false and abort is called with false', (done) => {
    const readSpy = jest.fn((abort, cb) => {
      if (abort === false) {
        cb(null, 'data');
      } else {
        cb(abort, 'data');
      }
    });
    const doneSpy = jest.fn((err) => {
      if (err === false) {
        throw new Error('Expected error to be true');
      }
      done();
    });
    const opSpy = jest.fn(() => false);
    const sink = drain(opSpy, doneSpy);
    sink(readSpy);
    sink.abort(false);
    expect(readSpy).toHaveBeenCalledTimes(1);
  });
});