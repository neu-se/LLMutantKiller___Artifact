import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should apply the last through stream twice due to nested loop structure in original", () => {
    let applyCount = 0;
    let count = 0;

    const source = (end: any, cb: Function) => {
      if (end || count++ >= 1) return cb(true);
      cb(null, 3);
    };

    // This through stream doubles the value and counts how many times it's applied
    const double = (read: Function) => {
      applyCount++;
      return (end: any, cb: Function) => {
        read(end, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    };

    const result = pull(source, double);
    const values: number[] = [];
    result(null, (end: any, data: any) => {
      if (!end) values.push(data);
    });

    // Original: double is applied twice (nested loop applies it in inner loop AND outer loop body)
    // so 3 * 2 * 2 = 12
    // Mutated: double is applied once, so 3 * 2 = 6
    expect(values).toEqual([12]);
  });
});