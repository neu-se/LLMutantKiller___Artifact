import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should call the callback with the first array element when no abort signal is provided and array is defined, and should not call the onAbort function immediately', () => {
    const array = [1, 2, 3];
    const onAbort = jest.fn();
    const valuesFunction = values(array, onAbort);
    const cb = jest.fn();
    valuesFunction(false, cb);
    expect(onAbort).not.toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, array[0]);
    // If the mutation is present, this will fail because onAbort will be called
    valuesFunction(false, () => {});
    expect(onAbort).not.toHaveBeenCalled();
  });
});