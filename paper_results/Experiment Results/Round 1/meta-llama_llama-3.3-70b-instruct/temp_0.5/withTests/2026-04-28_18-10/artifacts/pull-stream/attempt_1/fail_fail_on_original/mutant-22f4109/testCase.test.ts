import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when no done callback is supplied', () => {
    const spy = jest.fn();
    const sink = drain(null, spy);
    sink(null, () => {});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(new Error('no done callback supplied'));
  });
});