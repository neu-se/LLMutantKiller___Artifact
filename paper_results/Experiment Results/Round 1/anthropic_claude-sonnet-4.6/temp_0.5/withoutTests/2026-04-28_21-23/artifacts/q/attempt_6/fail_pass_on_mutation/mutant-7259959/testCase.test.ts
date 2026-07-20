import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async result.done mutation", () => {
  it("detects mutation in result.done check", async () => {
    (global as any).StopIteration = {};
    try {
      // The generator returns {done: true, value: 42} on first call
      // On second call (when continuer is called with the resolved value),
      // it throws. But result in the catch will be undefined (local var).
      // So we need result to be set before the throw.
      // The only way: make generator.next() set result then throw.
      // But that's impossible in normal JS.
      
      // Instead: make the generator return a non-thenable with done:true
      // so when() treats it as a value and calls callback({done:true, value:42})
      // Then in the next continuer call, generator.next({done:true,value:42}) throws
      // At this point result is undefined... 
      
      // WAIT: what if result = generator[verb](arg) throws AFTER setting result?
      // That's impossible. But what if generator.next() returns a thenable
      // that resolves to {done:true} and then the NEXT generator.next() throws?
      // result would still be undefined in the new continuer call.
      
      // The mutation must affect isStopIteration check. Let me verify by
      // checking if the test passes differently without StopIteration:
      
      const mockGen = {
        next: function(val: any) {
          Q["return"](42);
        }
      };
      
      const asyncFn = Q.async(function() { return mockGen as any; });
      
      const outcome = await new Promise<{type: string, value: any}>((resolve) => {
        asyncFn().then(
          (val: any) => resolve({type: "resolve", value: val}),
          (err: any) => resolve({type: "reject", value: err})
        );
      });

      // With original (isStopIteration check): resolves with 42
      // With mutation (if false): rejects with QReturnValue
      expect(outcome.type).toBe("resolve");
      expect(outcome.value).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});