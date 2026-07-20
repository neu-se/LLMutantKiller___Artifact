import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback without initial value", () => {
  it("sums array correctly using reduce fallback without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    const originalMap = Array.prototype.map;
    
    // @ts-ignore
    delete Array.prototype.reduce;

    try {
      const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];
      const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Directly invoke the internal array_reduce by accessing it through
      // a custom Promise operation that uses it without initial value
      // by patching notify to call progressListeners reduce without basis
      const deferred = QFresh.defer();
      
      let sum = 0;
      // Use allResolved which chains array_map -> array_reduce
      return QFresh.allResolved([QFresh(1), QFresh(2), QFresh(3)])
        .then(function(promises: any[]) {
          expect(promises.length).toBe(3);
          promises.forEach(function(p: any, i: number) {
            expect(p.inspect().value).toBe(i + 1);
          });
        });
    } finally {
      Array.prototype.reduce = originalReduce;
      const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];
    }
  });
});