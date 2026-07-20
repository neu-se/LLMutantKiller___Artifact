import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js'

describe('values', () => {
  it('should handle null input and call callback with true', () => {
    const callback = jest.fn();
    const read = values(null, () => {});
    read(null, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true, undefined);
  });
});