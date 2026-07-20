import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should throw an error when read.source is a function and not called', () => {
    const read = {
      source: function() {
        return 'source';
      }
    };

    const originalCode = pull(read, function(s) {
      return s;
    });

    expect(originalCode).toBe('source');
  });
});