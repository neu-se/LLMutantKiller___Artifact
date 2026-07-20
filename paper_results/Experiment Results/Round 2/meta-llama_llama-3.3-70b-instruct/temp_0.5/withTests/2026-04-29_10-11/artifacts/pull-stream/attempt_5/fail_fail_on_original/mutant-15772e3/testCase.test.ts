import * as filterModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe('filter', () => {
  it('should filter out elements that do not match the test function', () => {
    const test = jest.fn((data: any) => data > 0.5);
    const read = filterModule.default(test);
    const cb = jest.fn();
    read(null, cb);
    cb(null, 1);
    cb(true, 1);
    expect(test).toHaveBeenCalledTimes(1);
  });
});