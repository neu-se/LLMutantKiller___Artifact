import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call read when read is undefined in the abort function', () => {
    let readCalled = false;
    const read = jest.fn(() => {
      readCalled = true;
    });
    const sink = drain(null, () => {});
    sink(read);
    sink.abort();
    expect(readCalled).toBe(false);
  });
});