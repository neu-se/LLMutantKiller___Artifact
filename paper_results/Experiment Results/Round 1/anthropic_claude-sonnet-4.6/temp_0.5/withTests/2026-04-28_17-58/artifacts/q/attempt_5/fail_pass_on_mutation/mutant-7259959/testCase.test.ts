describe("Q.async with SpiderMonkey-style generator returning a value", () => {
  it("fulfills with the return value when the generator signals completion via QReturnValue", (done) => {
    (global as any).StopIteration = {};
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create a fake SpiderMonkey-style generator
    // In SpiderMonkey, when a generator is done, calling next() throws StopIteration
    // Q["return"] throws a QReturnValue which isStopIteration() recognizes
    let step = 0;
    const fakeGenerator = {
      next: function(val: any) {
        step++;
        if (step === 1) {
          // First call: throw a QReturnValue (simulating Q["return"](42))
          const err = new (Q["return"] as any).__proto__.constructor(42);
          // Actually use Q["return"] mechanism - throw QReturnValue
          try {
            Q["return"](42);
          } catch(e) {
            throw e;
          }
        }
        return { value: undefined, done: true };
      },
      throw: function(e: any) { throw e; }
    };

    const asyncFn = Q.async(function() {
      return fakeGenerator;
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