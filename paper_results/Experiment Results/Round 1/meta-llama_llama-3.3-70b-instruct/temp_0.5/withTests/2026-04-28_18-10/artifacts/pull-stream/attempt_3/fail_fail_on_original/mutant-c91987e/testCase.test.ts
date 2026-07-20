import { drain } from '../../../../sinks/drain.js';

describe('drain', () => {
  it('should call the read function with abort when abort is called', () => {
    let readCalled = false;
    const read = (abort, cb) => {
      readCalled = true;
      cb(null);
    };
    const sink = drain(() => {}, () => {});
    sink.abort();
    sink(read);
    expect(readCalled).toBe(true);
  });
});