import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should not call the onAbort function when no abort signal is provided and array is defined, and should call the callback multiple times', () => {
    const array = [1, 2, 3];
    const onAbort = jest.fn();
    const valuesFunction = values(array, onAbort);
    const cb = jest.fn();
    valuesFunction(false, cb);
    valuesFunction(false, cb);
    valuesFunction(false, cb);
    expect(onAbort).not.toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(3);
    expect(cb).toHaveBeenNthCalledWith(1, null, array[0]);
    expect(cb).toHaveBeenNthCalledWith(2, null, array[1]);
    expect(cb).toHaveBeenNthCalledWith(3, null, array[2]);
  });
});