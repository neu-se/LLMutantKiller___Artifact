describe("Q.async with SpiderMonkey-style Q.return", () => {
  it("fulfills with the value passed to Q.return rather than rejecting", (done) => {
    // Simulate SpiderMonkey environment
    (global as any).StopIteration = {};
    
    // Reset modules so Q re-evaluates typeof StopIteration
    jest.resetModules();
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    const asyncFn = Q.async(function () {
      Q["return"](42);
    });

    asyncFn().then(
      (value: unknown) => {
        delete (global as any).StopIteration;
        expect(value).toBe(42);
        done();
      },
      (err: unknown) => {
        delete (global as any).StopIteration;
        done(new Error("Expected fulfillment with 42 but got rejection: " + err));
      }
    );
  });
});