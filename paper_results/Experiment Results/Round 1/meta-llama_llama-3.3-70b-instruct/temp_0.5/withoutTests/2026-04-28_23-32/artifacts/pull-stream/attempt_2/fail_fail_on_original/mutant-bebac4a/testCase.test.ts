import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call read when read is undefined in the abort function', (done) => {
    let readCalled = false;
    const read = () => {
      readCalled = true;
    };
    const sink = drain(null, () => {
      expect(readCalled).toBe(false);
      done();
    });
    sink.abort();
    expect(readCalled).toBe(false);
  });
});