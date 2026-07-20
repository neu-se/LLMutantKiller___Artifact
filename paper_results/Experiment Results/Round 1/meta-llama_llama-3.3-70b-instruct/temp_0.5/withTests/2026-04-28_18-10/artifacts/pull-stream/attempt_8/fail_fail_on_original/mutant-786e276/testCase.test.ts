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

    const originalRead = {
      source: function() {
        return function() {
          return 'source';
        }
      }
    };

    pull(originalRead);

    const mutatedRead = {
      source: ""
    };

    expect(() => pull(mutatedRead)).toThrowError();
  });
});