import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not throw error when end is true', () => {
    const read = (end: any, cb: any) => {
      cb(true, null);
    };
    const done = jest.fn();
    const sink = drain(read, done);
    expect(() => sink(true)).not.toThrow();
  });
});