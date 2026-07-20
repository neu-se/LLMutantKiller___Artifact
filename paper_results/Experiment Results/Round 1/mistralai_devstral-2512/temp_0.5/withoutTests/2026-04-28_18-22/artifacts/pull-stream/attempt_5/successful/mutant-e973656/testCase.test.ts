import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should not throw when end is exactly true and no done callback', () => {
    let readCalled = false;

    const source = (abort: any, cb: (end: any) => void) => {
      readCalled = true;
      cb(true);
    };

    const sink = drain(null);

    expect(() => {
      sink(source);
    }).not.toThrow();

    expect(readCalled).toBe(true);
  });
});