import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return values in the correct order', (done) => {
    const array = [1, 2, 3];
    const read = values(array, () => {});
    let count = 0;
    let result: number | null = null;

    read(null, (end: any, data: any) => {
      if (end === true) {
        expect(result).toBe(3);
        done();
      } else {
        if (count === 2) {
          result = data;
        }
        count++;
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(result).toBe(3);
            done();
          }
        });
      }
    });
  });
});