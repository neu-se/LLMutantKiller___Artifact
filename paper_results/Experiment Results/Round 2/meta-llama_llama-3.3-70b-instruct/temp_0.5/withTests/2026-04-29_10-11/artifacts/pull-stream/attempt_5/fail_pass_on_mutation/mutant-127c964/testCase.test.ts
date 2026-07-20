import * as valuesModule from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const read = valuesModule.default(obj);
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