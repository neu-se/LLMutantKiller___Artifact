import { count } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js';

describe('count function', () => {
  it('should return the correct count when end is true', () => {
    const stream = count(5);
    let counter = 0;
    stream(null, (end: any, data: any) => {
      if (end) {
        expect(counter).toBe(5);
      } else {
        counter++;
        stream(null, (end: any, data: any) => {
          if (end) {
            expect(counter).toBe(5);
          }
        });
      }
    });
  });
});