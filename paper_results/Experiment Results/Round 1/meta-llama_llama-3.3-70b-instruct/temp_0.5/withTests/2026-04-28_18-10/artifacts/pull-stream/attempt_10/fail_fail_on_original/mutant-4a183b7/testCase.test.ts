import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should call read.source when it is a function', () => {
    let called = false;
    const read = {
      source: function() {
        called = true;
        return 'source';
      }
    };

    pull(read, (s: any) => {
      if (s !== 'source') {
        throw new Error('read.source was not called correctly');
      }
    });
    expect(called).toBe(true);
  });
});