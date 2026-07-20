import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should handle null input correctly', (done) => {
    const read = values(null, () => {});
    read(null, (end: any, data: any) => {
      if (end) {
        expect(end).toBe(true);
        done();
      } else {
        expect(data).toBeUndefined();
        done();
      }
    });
  });
});