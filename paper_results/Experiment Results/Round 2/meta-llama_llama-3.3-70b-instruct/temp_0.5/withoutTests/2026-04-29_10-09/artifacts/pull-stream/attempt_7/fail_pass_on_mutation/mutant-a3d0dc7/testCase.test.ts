import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should return a function that does not call the onAbort function when no abort signal is provided and array is defined, and should return a function that calls the callback with the first array element', () => {
    const array = [1, 2, 3];
    const onAbort = jest.fn();
    const valuesFunction = values(array, onAbort);
    const cb = jest.fn();
    const result = valuesFunction(false, cb);
    expect(result).toBeUndefined();
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, array[0]);
    expect(onAbort).not.toHaveBeenCalled();
  });
});