import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const ary = [1, 2, 3];
    const read = values(ary);
    let count = 0;
    read(null, (end: any, data: any) => {
      if (end) return;
      count++;
      expect(data).toBeGreaterThan(0);
      read(null, (end: any, data: any) => {
        if (end) return;
        count++;
        expect(data).toBeGreaterThan(0);
        read(null, (end: any, data: any) => {
          if (end) return;
          count++;
          expect(data).toBeGreaterThan(0);
          read(null, (end: any, data: any) => {
            if (end) {
              expect(end).toBe(true);
              expect(count).toBe(3);
            }
          });
        });
      });
    });
  });
});