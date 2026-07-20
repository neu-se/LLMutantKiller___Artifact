import { filter } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe('filter', () => {
  it('should filter out elements that do not match the test function', () => {
    let called = false;
    const read = filter((data: any) => {
      called = true;
      return data > 0.5;
    });
    const cb = jest.fn();
    read(null, cb);
    expect(called).toBe(true);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});