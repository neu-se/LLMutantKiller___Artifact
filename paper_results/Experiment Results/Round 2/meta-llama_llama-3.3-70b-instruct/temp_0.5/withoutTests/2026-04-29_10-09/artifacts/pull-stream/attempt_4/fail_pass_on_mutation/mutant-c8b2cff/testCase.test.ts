import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done with the correct error when op returns false and abort is called', (done) => {
    const readSpy = jest.fn((abort, cb) => {
      if (abort) {
        cb(true);
      } else {
        cb(null, 'data');
      }
    });
    const doneSpy = jest.fn((err) => {
      if (err !== true) {
        throw new Error('Expected error to be true');
      }
      done();
    });
    const opSpy = jest.fn(() => false);
    const sink = drain(opSpy, doneSpy);
    sink(readSpy);
    sink.abort();
    sink(readSpy);
  });
});