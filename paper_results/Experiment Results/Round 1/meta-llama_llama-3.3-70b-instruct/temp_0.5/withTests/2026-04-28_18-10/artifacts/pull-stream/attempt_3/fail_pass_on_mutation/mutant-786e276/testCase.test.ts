import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should correctly handle read.source when it is a function', () => {
    const read = {
      source: function() {
        return function() {
          return 'source';
        }
      }
    };

    expect(() => {
      pull(pull.values([1, 2, 3]), { source: "" });
    }).toThrowError();
  });
});