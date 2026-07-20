import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call read with the correct abort value', (done) => {
    const readSpy = jest.fn((abort, cb) => {
      if (abort !== true) {
        throw new Error('Expected abort to be true');
      }
      cb(null);
    });
    const doneSpy = jest.fn();
    const sink = drain(null, doneSpy);
    sink(readSpy);
    sink.abort(false, () => {
      expect(readSpy).toHaveBeenCalledTimes(1);
      expect(readSpy).toHaveBeenCalledWith(true, expect.any(Function));
      done();
    });
  });
});