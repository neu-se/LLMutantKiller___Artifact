describe('count function', () => {
  it('should return the correct count when end is true', () => {
    const count = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js');
    const stream = count(5);
    let counter = 0;
    stream(null, (end: any, data: any) => {
      if (end) {
        expect(counter).toBe(5);
      } else {
        counter++;
        if (counter < 5) {
          stream(null, (end: any, data: any) => {
            if (end) {
              expect(counter).toBe(5);
            }
          });
        }
      }
    });
    stream(null, (end: any, data: any) => {
      if (end) {
        expect(counter).toBe(5);
      }
    });
  });
});