import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call read with abort and callback only when read is defined', () => {
    let readCalled = false;
    const read = jest.fn(() => {
      readCalled = true;
    });
    const sink = drain(null, null);
    sink.read = read;
    sink.abort(true, jest.fn());
    expect(readCalled).toBe(true);

    readCalled = false;
    const sink2 = drain(null, null);
    sink2.abort(true, jest.fn());
    expect(readCalled).toBe(false);
  });
});