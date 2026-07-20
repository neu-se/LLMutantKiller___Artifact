import { infinite } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe('infinite function', () => {
  it('should call callback with end value when end is truthy', () => {
    const cb = jest.fn();
    const end = 'test';
    const generate = jest.fn();
    infinite(generate)(end, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(end);
  });
});