import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when end is not true and done is provided', () => {
    const done = jest.fn();
    const err = new Error('test error');
    const sink = drain(() => {}, done);
    sink(err, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(err);
  });
});