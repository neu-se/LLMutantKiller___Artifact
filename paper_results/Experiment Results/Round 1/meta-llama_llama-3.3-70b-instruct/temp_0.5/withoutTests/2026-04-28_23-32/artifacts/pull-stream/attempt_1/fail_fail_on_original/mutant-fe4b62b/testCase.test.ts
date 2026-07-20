import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle abort correctly', () => {
    let called = false;
    const read = (err, cb) => {
      if (err) {
        called = true;
        cb();
      } else {
        cb(null, null);
      }
    };

    const sink = drain(null, () => {});
    sink.abort((err) => {
      expect(called).toBe(true);
    }, () => {
      expect(called).toBe(true);
    });
  });
});