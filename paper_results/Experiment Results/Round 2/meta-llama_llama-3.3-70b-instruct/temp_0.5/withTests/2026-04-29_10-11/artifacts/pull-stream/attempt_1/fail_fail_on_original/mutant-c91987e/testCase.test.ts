import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call the read function with abort when abort is called', () => {
    let readCalled = false;
    const read = () => {
      readCalled = true;
    };
    const sink = drain(null, null);
    sink.abort();
    sink(read);
    expect(readCalled).toBe(true);
  });
});