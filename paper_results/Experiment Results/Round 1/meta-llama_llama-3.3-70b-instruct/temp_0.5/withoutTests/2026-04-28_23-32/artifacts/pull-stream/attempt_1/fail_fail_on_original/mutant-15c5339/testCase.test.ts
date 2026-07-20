import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take function', () => {
  it('should behave correctly when last is true and an error occurs', () => {
    const test = jest.fn();
    const read = jest.fn();
    const cb = jest.fn();
    const takeFunction = take(1, { last: true });
    takeFunction(read)(true, cb);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(true, expect.any(Function));
    const readCallback = read.mock.calls[0][1];
    readCallback(new Error('Test error'));
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(new Error('Test error'), true);
  });
});