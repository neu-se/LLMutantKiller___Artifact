import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call read with the correct abort value when op returns false and abort is called with false', (done) => {
    let callCount = 0;
    const readSpy = jest.fn((abort, cb) => {
      callCount++;
      if (callCount === 2 && abort === true) {
        throw new Error('Expected abort to be false');
      }
      cb(null, 'data');
    });
    const doneSpy = jest.fn();
    const opSpy = jest.fn(() => false);
    const sink = drain(opSpy, doneSpy);
    sink(readSpy);
    sink.abort(false);
    done();
  });
});