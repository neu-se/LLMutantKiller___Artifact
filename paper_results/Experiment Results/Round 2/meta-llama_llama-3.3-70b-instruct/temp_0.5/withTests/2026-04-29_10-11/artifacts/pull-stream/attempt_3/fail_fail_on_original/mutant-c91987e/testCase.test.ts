import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call the done callback when abort is called', () => {
    let doneCalled = false;
    const done = () => {
      doneCalled = true;
    };
    const sink = drain(null, done);
    sink.abort();
    expect(doneCalled).toBe(true);
  });
});