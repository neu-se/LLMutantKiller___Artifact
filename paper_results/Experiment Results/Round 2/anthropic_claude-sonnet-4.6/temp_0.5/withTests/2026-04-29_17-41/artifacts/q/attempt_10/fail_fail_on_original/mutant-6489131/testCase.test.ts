describe("Q with all array method fallbacks", () => {
  it("allResolved works correctly when Array methods are unavailable", () => {
    const origReduce = Array.prototype.reduce;
    const origMap = Array.prototype.map;
    const origIndexOf = Array.prototype.indexOf;

    // @ts-ignore
    delete Array.prototype.reduce;
    // @ts-ignore  
    delete Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.indexOf;

    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.reduce = origReduce;
    Array.prototype.map = origMap;
    Array.prototype.indexOf = origIndexOf;

    return QFresh.allResolved([QFresh.resolve(1), QFresh.resolve(2)])
      .then(function(promises: any[]) {
        expect(promises.length).toBe(2);
        expect(promises[0].inspect()).toEqual({ state: "fulfilled", value: 1 });
        expect(promises[1].inspect()).toEqual({ state: "fulfilled", value: 2 });
      });
  });
});