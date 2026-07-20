import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values function', () => {
  it('should not abort when no abort signal is provided', () => {
    const array = [1, 2, 3];
    const onAbort = jest.fn();
    const valuesFunction = values(array, onAbort);
    const cb = jest.fn();
    valuesFunction(false, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, array[0]);
  });
});