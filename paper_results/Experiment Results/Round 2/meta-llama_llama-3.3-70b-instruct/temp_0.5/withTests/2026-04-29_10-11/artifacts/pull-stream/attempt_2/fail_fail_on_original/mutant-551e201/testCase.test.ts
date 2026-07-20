import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const err = new Error('Test error');
    const read = drain(null, null);
    read(err, () => {});
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(expect.any(Error));
  });
});