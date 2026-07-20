describe("Q process detection", () => {
  it("should not use process.nextTick when process.toString() does not return [object process]", (done) => {
    const originalToString = process.toString;
    (process as any).toString = () => "[object Object]";
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (process as any).toString = originalToString;
    
    const spy = jest.spyOn(process, 'nextTick');
    
    Q(42).then((val: number) => {
      const callCount = spy.mock.calls.length;
      spy.mockRestore();
      expect(callCount).toBe(0);
      done();
    });
  });
});