import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw error when end is truthy but not true and no done callback', () => {
    const error = new Error('test error');
    let readCalled = false;

    const source = (abort: any, cb: (end: any) => void) => {
      readCalled = true;
      cb(error);
    };

    const sink = drain(null);

    expect(() => {
      sink(source);
    }).toThrow(error);

    expect(readCalled).toBe(true);
  });
});