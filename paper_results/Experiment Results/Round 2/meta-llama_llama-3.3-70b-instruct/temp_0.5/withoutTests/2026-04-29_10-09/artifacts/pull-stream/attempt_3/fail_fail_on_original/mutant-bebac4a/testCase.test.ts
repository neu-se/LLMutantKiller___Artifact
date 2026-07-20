import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call read with abort and callback only when read is defined', () => {
    const drainFunction = drain(null, null);
    expect(drainFunction).toBeDefined();
    const read = jest.fn();
    drainFunction.read = read;
    drainFunction.abort(true, jest.fn());
    expect(read).toHaveBeenCalledTimes(1);

    const drainFunction2 = drain(null, null);
    drainFunction2.abort(true, jest.fn());
    expect(read).toHaveBeenCalledTimes(1);
  });
});