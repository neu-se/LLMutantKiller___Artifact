import * as infiniteModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe('infinite function', () => {
  it('should call callback with end value when end is truthy in the original version', () => {
    const cb = jest.fn();
    const end = true;
    const generate = () => {};
    const infiniteFunc = infiniteModule.default;
    infiniteFunc(generate)(end, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(end);
  });
});