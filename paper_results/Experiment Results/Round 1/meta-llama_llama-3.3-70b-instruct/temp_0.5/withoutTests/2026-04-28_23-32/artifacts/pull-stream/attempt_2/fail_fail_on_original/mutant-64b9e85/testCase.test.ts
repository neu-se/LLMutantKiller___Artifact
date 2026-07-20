import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error correctly', () => {
    const cb = jest.fn();
    const test = (data: any) => true;
    const err = true;
    const read = jest.fn((end: any, cb: any) => {
      cb(err);
    });
    const sink = find(test, cb);
    sink(err, () => {});
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, null);
  });
});