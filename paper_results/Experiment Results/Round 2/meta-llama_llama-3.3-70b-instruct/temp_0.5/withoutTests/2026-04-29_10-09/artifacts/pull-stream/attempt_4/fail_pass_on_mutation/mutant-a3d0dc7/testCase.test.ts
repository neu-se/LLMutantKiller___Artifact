import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should not call the onAbort function when no abort signal is provided and array is defined', () => {
    const array = [1, 2, 3];
    const onAbort = jest.fn();
    const valuesFunction = values(array, onAbort);
    const cb = jest.fn();
    valuesFunction(false, cb);
    expect(onAbort).not.toHaveBeenCalled();
    valuesFunction(false, cb);
    expect(onAbort).not.toHaveBeenCalled();
  });
});