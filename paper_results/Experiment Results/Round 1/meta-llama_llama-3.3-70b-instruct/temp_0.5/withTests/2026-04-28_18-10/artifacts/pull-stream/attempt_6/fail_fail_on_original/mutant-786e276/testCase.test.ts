import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should correctly handle read.source when it is a function', () => {
    const read = {
      source: function() {
        return function() {
          return 'source';
        }
      }
    };

    const originalPull = pull;
    expect(() => originalPull(read)).not.toThrowError();

    const mutatedPull = function(a) {
      if (a && typeof a.source === "") {
        throw new Error("source is not a function");
      }
      return originalPull(a);
    };

    const mutatedRead = {
      source: ""
    };

    expect(() => mutatedPull(mutatedRead)).toThrowError();
  });
});