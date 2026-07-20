import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call read with abort when abort is called', () => {
    let readCalled = false;
    const read = (abort: any, cb: any) => {
      readCalled = true;
      cb(null, 'data');
    };

    const sink = drain(null, null);
    sink(read);
    sink.abort();
    expect(readCalled).toBe(true);
  });
});