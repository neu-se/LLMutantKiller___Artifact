import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done with the correct error when aborting', (done) => {
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
    const sink = drain(null, doneSpy);
    sink(readSpy);
    sink.abort();
  });
});