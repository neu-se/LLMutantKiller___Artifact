import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values function', () => {
  it('should return values when given an array', (done) => {
    const array = [1, 2, 3];
    const read = values(array, () => {});
    let count = 0;

    read(null, (end: any, data: any) => {
      if (end === true) {
        expect(count).toBe(3);
        done();
      } else {
        expect(data).toBe(array[count]);
        count++;
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(count).toBe(3);
            done();
          } else {
            expect(data).toBe(array[count]);
            count++;
            read(null, (end: any, data: any) => {
              if (end === true) {
                expect(count).toBe(3);
                done();
              }
            });
          }
        });
      }
    });
  });
});