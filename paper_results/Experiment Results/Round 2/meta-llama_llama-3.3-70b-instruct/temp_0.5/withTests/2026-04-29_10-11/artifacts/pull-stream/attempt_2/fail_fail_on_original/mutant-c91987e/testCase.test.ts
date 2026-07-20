import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should call the read function with abort when abort is called', () => {
    let readCalled = false;
    const read = jest.fn((abort, cb) => {
      if (abort) {
        readCalled = true;
        cb(abort);
      }
    });
    const sink = drain(null, null);
    sink.abort();
    sink(read);
    expect(readCalled).toBe(true);
  });
});