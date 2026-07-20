import * as takeModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should behave correctly when last is true and an error occurs', () => {
    const read = jest.fn((end, cb) => {
      cb(new Error('Test error'), null);
    });
    const cb = jest.fn();
    const takeFunction = takeModule.default(1, { last: true });
    takeFunction(read)(true, cb);
    expect(read).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(expect.any(Error), expect.anything());
    expect(cb.mock.calls[0][1]).not.toBe(true);
  });
});