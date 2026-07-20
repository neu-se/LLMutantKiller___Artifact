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
    // Check that the function does not treat all objects as arrays
    const ary = [1, 2, 3];
    const read2 = valuesModule.default(ary);
    let count2 = 0;
    read2(null, (end: any, data: any) => {
      if (end) return;
      count2++;
      expect(data).toBe(1);
      read2(null, (end: any, data: any) => {
        if (end) return;
        count2++;
        expect(data).toBe(2);
        read2(null, (end: any, data: any) => {
          if (end) return;
          count2++;
          expect(data).toBe(3);
          read2(null, (end: any, data: any) => {
            if (end) {
              expect(end).toBe(true);
              expect(count2).toBe(3);
            }
          });
        });
      });
    });
    // If the function treats all objects as arrays, it will not pass this test
    const obj2 = { a: 1, b: 2, c: 3 };
    const read3 = valuesModule.default(obj2);
    let count3 = 0;
    read3(null, (end: any, data: any) => {
      if (end) return;
      count3++;
      expect(data).not.toBe(1); // This will fail if the function treats objects as arrays
      read3(null, (end: any, data: any) => {
        if (end) return;
        count3++;
        expect(data).not.toBe(2);
        read3(null, (end: any, data: any) => {
          if (end) return;
          count3++;
          expect(data).not.toBe(3);
          read3(null, (end: any, data: any) => {
            if (end) {
              expect(end).toBe(true);
              expect(count3).toBe(3);
            }
          });
        });
      });
    });
    // Check that the function treats objects and arrays differently
    expect(count).toBe(3);
    expect(count2).toBe(3);
    expect(count3).toBe(3);
  });
});