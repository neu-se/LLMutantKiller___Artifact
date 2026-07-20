import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('drain', () => {
  it('should call done when done callback is supplied and no error occurs', () => {
    const spy = jest.fn();
    const sink = drain(() => true, spy);
    values([1, 2, 3])(null, (end, data) => {
      if (end) {
        spy();
      } else {
        sink(end, data);
      }
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});