const originalReduce = Array.prototype.reduce;
// @ts-ignore
delete Array.prototype.reduce;

// Now require Q so it captures the fallback array_reduce
// Need to clear require cache first if it was already loaded
const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
delete require.cache[modulePath];
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

// Restore Array.prototype.reduce
Array.prototype.reduce = originalReduce;

describe("array_reduce fallback", () => {
  it("correctly accumulates values when Array.prototype.reduce is unavailable at load time", () => {
    return Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]).then((values: any[]) => {
      expect(values).toEqual([1, 2, 3]);
    });
  });
});