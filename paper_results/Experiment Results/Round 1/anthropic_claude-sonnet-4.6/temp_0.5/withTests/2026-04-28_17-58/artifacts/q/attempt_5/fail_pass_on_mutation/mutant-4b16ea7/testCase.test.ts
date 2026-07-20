describe("Q window setImmediate branch", () => {
  it("schedules tasks correctly when in window+setImmediate environment", (done) => {
    jest.resetModules();
    
    const originalProcessToString = Object.getOwnPropertyDescriptor(Object.prototype, 'toString');
    process.toString = () => "[object Object]"; // bypass Node.js branch
    (global as any).window = {};
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    process.toString = Function.prototype.toString;
    delete (global as any).window;
    
    Q.resolve(42).then((val: number) => {
      expect(val).toBe(42);
      done();
    });
  });
});