describe('count function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const max = 5;
    const read = require('../../../sources/count')(max);
    let i = 0;
    read(null, (end, data) => {
      if (end) return;
      i++;
      if (i === max) {
        read(null, (end, data) => {
          if (end !== true) throw new Error('Expected end to be true');
        });
      } else {
        read(null, (end, data) => {
          if (end !== null) throw new Error('Expected end to be null');
        });
      }
    });
    read(null, (end, data) => {
      if (end !== true) throw new Error('Expected end to be true');
    });
  });
});