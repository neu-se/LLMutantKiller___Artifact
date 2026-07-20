import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream'

describe('values', () => {
  it('should handle null input and call callback', () => {
    const callback = jest.fn();
    const read = pull.values(null, () => {});
    read(null, callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});