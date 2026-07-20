describe('count function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const max = 6; // This should cause the test to fail on the mutated code
    const read = require('../../../../../../../../../../subject_repositories/pull-stream/sources/count')(max);
    let i = 0;
    read(null, (end: boolean | null, data: number) => {
      if (end) return;
      i++;
      if (i < max) {
        read(null, (end: boolean | null, data: number) => {
          if (end !== null) throw new Error('Expected end to be null');
        });
      } else {
        read(null, (end: boolean | null, data: number) => {
          if (end !== true) throw new Error('Expected end to be true');
        });
      }
    });
    read(null, (end: boolean | null, data: number) => {
      if (end !== true) throw new Error('Expected end to be true');
    });
  });
});