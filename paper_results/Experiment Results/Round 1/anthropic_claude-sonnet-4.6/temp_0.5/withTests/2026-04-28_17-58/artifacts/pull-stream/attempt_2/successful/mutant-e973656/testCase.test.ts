import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain without done callback', () => {
  it('should not throw when stream ends normally with end===true and no done callback is provided', (done) => {
    let callCount = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      callCount++;
      if (callCount === 1) {
        cb(null, 'value');
      } else {
        cb(true); // normal stream end
      }
    };

    // No done callback supplied - in original code, normal end (true) should NOT trigger throw
    // In mutated code, (end || end !== true) = (true || false) = true, causing throw
    expect(() => {
      const sink = drain((data: any) => {
        // consume data
      }); // intentionally no done callback
      sink(source);
    }).not.toThrow();

    done();
  });
});