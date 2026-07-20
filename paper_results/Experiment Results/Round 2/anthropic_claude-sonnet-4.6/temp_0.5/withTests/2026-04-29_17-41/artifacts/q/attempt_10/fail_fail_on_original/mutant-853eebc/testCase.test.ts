describe("array_map shim fallback behavior", () => {
  it("maps array elements using the fallback when native map is absent", (done) => {
    const savedMap = Array.prototype.map;
    // @ts-ignore
    delete Array.prototype.map;
    
    // Restore immediately so Jest internals still work
    Array.prototype.map = savedMap;

    jest.isolateModules(() => {
      // We need to trick the module - patch before require
      const proto = Array.prototype as any;
      const saved2 = proto.map;
      delete proto.map;
      
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      proto.map = saved2;
      
      Q.allSettled([1, 2, 3]).then((results: any[]) => {
        expect(results.length).toBe(3);
        done();
      }).catch(done);
    });
  });
});