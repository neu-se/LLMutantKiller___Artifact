import { filter } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe('filter', () => {
  it('should filter out elements that do not match the test function', () => {
    const read = filter((data: any) => data > 0.5);
    const cb = jest.fn();
    read(null, cb);
    cb(true, 1);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});