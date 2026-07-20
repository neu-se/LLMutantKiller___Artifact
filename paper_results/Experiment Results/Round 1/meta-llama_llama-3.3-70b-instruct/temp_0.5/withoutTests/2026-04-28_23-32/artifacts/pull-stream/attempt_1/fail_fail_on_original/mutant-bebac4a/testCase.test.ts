import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call read when read is undefined', (done) => {
    let readCalled = false;
    const read = jest.fn(() => {
      readCalled = true;
    });
    const sink = drain(null, () => {
      expect(readCalled).toBe(false);
      done();
    });
    sink.abort();
  });
});