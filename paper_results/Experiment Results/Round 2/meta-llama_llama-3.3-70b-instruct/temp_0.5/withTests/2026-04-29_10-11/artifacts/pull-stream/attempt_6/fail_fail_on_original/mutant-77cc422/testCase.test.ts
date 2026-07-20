describe('count function', () => {
  it('should return the correct count when end is true', (done) => {
    const count = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js');
    const stream = count(5);
    let counter = 0;
    stream(null, (end: any, data: any) => {
      if (end) {
        done();
      } else {
        counter++;
        if (counter === 5) {
          stream(true, (end: any, data: any) => {
            expect(end).toBe(true);
            done();
          });
        } else {
          stream(null, (end: any, data: any) => {
            if (end) {
              done();
            }
          });
        }
      }
    });
  });
});