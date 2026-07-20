import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call the done callback when abort is called', () => {
    let doneCalled = false;
    const op = () => true;
    const done = (err) => {
      if (err) {
        doneCalled = true;
      }
    };
    const sink = drain(op, done);
    sink.abort(new Error());
    expect(doneCalled).toBe(true);
  });
});