import filter from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe('filter - synchronous loop optimization', () => {
  it('should handle large numbers of synchronously filtered items without stack overflow', (done) => {
    const TOTAL = 50000;
    let i = 0;

    // Synchronous source producing numbers 0 to TOTAL-1
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) return cb(end);
      if (i >= TOTAL) return cb(true);
      cb(null, i++);
    };

    // Only pass the very last item, forcing TOTAL-1 synchronous filter rejections
    const filterThrough = filter((d: number) => d === TOTAL - 1);
    const filteredRead = filterThrough(source);

    filteredRead(null, (end: any, data: any) => {
      if (end && end !== true) {
        done(end);
        return;
      }
      if (end === true) {
        done(new Error('Expected to find item but got end of stream'));
        return;
      }
      expect(data).toBe(TOTAL - 1);

      filteredRead(null, (end2: any) => {
        expect(end2).toBe(true);
        done();
      });
    });
  });
});