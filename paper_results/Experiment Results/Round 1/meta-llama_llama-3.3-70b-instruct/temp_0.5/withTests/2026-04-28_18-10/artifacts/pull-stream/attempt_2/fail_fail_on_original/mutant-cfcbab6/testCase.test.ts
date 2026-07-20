import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should not iterate over arguments with length greater than the actual number of arguments', () => {
    const read = pull(function (read) {
      return read;
    }, function (read) {
      return read;
    }, function (read) {
      throw new Error('Should not be called');
    });

    expect(() => read(null, () => {})).not.toThrow();
  });
});