import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should return 6 when max is set to 5 with the original code', () => {
    const originalCount = count(5);
    let result = 0;
    originalCount(null, (err: any, data: any) => {
      if (err) throw err;
      if (data !== undefined) {
        result++;
        if (result === 6) {
          expect(data).toBe(5);
        }
      }
    });
    originalCount(null, (err: any, data: any) => {
      if (err) throw err;
      if (data !== undefined) {
        result++;
        if (result === 6) {
          expect(data).toBe(5);
        }
      }
    });
    originalCount(null, (err: any, data: any) => {
      if (err) throw err;
      if (data !== undefined) {
        result++;
        if (result === 6) {
          expect(data).toBe(5);
        }
      }
    });
    originalCount(null, (err: any, data: any) => {
      if (err) throw err;
      if (data !== undefined) {
        result++;
        if (result === 6) {
          expect(data).toBe(5);
        }
      }
    });
    originalCount(null, (err: any, data: any) => {
      if (err) throw err;
      if (data !== undefined) {
        result++;
        if (result === 6) {
          expect(data).toBe(5);
        }
      }
    });
    originalCount(null, (err: any, data: any) => {
      if (err) throw err;
      if (data !== undefined) {
        result++;
        if (result === 6) {
          expect(data).toBe(5);
        }
      }
    });
  });
});