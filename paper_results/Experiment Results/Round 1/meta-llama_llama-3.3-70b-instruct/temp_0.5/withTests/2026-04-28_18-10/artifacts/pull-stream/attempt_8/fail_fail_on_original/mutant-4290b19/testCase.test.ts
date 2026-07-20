import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle the mutation correctly', () => {
    const length = 2;
    const args = new Array(length);
    for (var i = 0; i < length; i++) {
      args[i] = i;
    }
    const read = pull(
      function (end, cb) {
        cb(null, 1);
      },
      function (read) {
        return function (end, cb) {
          read(end, cb);
        };
      }
    );
    read(null, (end, data) => {
      if (end === true) {
        throw new Error('Unexpected end');
      }
    });
    const mutatedLength = length + 1;
    const mutatedArgs = new Array(mutatedLength);
    for (var i = 0; i <= mutatedLength; i++) {
      mutatedArgs[i] = i;
    }
    expect(mutatedArgs[mutatedLength]).toBeUndefined();
  });
});