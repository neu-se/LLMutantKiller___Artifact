describe('count function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const max = 5;
    const read = require('../../../../../../../../../../subject_repositories/pull-stream/sources/count')(max);
    let i = 0;
    read(null, (end, data) => {
      if (end === true) {
        if (i !== max) {
          throw new Error('Expected i to be equal to max');
        }
      } else {
        i++;
        read(null, (end, data) => {
          if (end === true) {
            if (i !== max) {
              throw new Error('Expected i to be equal to max');
            }
          }
        });
      }
    });
  });
});