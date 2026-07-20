import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should handle read.source correctly', () => {
    const read = {
      source: function() {
        return {
          source: function() {
            throw new Error('Test error');
          }
        }
      }
    };

    expect(() => pull(read)).toThrowError();
  });
});