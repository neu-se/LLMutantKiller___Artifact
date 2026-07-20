import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call the read function with abort when abort is called', () => {
    let readCalled = false;
    const op = () => true;
    const done = () => {};
    const read = jest.fn((abort, cb) => {
      if (abort) {
        readCalled = true;
        cb(abort);
      }
    });
    const sink = drain(op, done);
    sink(read);
    sink.abort();
    expect(readCalled).toBe(true);
  });
});