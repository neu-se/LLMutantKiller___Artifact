import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should call read.source when it is a function', () => {
    let called = false;
    const read = {
      source: function() {
        called = true;
        return function() {};
      }
    };

    pull(read, function(s) {
      return s;
    });

    expect(called).toBe(true);
  });
});