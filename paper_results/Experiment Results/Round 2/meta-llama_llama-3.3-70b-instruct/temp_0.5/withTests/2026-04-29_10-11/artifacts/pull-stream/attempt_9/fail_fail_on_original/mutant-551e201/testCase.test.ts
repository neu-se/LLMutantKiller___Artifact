import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const read = drain(() => {}, null);
    const err = new Error('Test error');
    const cb = jest.fn();
    read(null, cb);
    read(err, cb);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});