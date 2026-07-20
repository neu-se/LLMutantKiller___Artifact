import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is not true', () => {
    const done = jest.fn();
    const end = new Error('test error');
    const sink = drain(() => {}, done);
    sink(end, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(end);
  });
});