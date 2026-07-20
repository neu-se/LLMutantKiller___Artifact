import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', () => {
    let called = false;
    const read = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      if (called) return;
      called = true;
      cb(false, null);
    });
    const sink = drain(null, (err: any) => {
      expect(err).toBeNull();
    });
    sink(read);
    expect(called).toBe(true);
  });
});