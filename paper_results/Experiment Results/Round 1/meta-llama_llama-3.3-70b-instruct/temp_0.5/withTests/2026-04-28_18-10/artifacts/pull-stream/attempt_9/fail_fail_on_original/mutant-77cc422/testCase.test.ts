import { count } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js';

describe('count function', () => {
  it('should call cb with next value when end is false', (done) => {
    const read = count(10);
    let i = 0;
    read(null, (end, data) => {
      if (end === true) {
        expect(i).toBe(10);
        done();
      } else if (end) {
        done(end);
      } else {
        expect(data).toBe(i);
        i++;
        read(null, (end, data) => {
          if (end === true) {
            expect(i).toBe(10);
            done();
          } else if (end) {
            done(end);
          } else {
            expect(data).toBe(i);
            i++;
          }
        });
      }
    });
  });
});