import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should throw an error when called with an incorrect number of arguments', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      function (read) {
        return function (end, cb) {
          if (end !== true) cb(null, 1);
          else cb(end);
        }
      }
    );

    expect(() => read()).toThrowError('partial sink should only be called once!');
  });
});