describe("Q SES branch", () => {
  it("should set ses.makeQ to definition function when ses.ok() returns true", (done) => {
    // We need to test the SES branch by using vm to run q.js in a fresh context
    const vm = require("vm");
    const fs = require("fs");
    const path = require("path");

    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // Create a context that looks like a SES environment
    // ses.ok() returns false => original returns early, mutated does not
    // But since there's no code after the if/else in the ses branch,
    // the only difference is: does execution continue past the ses branch?
    // In an else-if chain it cannot. So let's test ses.ok() = true case
    // to verify ses.makeQ gets set (both should set it)
    // and ses.ok() = false case to verify ses.makeQ is NOT set (original)
    // vs IS set (mutated - NO, mutated also skips else when !ses.ok() is true)

    // The mutation is truly equivalent. Let's verify the module works normally.
    const sesMakeQCalls: any[] = [];
    const ses = {
      ok: () => false,
      set makeQ(val: any) {
        sesMakeQCalls.push(val);
      },
      get makeQ() {
        return sesMakeQCalls[sesMakeQCalls.length - 1];
      }
    };

    const context = vm.createContext({
      ses,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
    });

    vm.runInContext(qSource, context);

    // Original: ses.ok() false => return => ses.makeQ never set => sesMakeQCalls empty
    // Mutated: ses.ok() false => empty if => else skipped => ses.makeQ never set => sesMakeQCalls empty
    // Both equivalent... 

    // Try ses.ok() = true instead
    const ses2 = {
      ok: () => true,
      makeQ: undefined as any,
    };

    const context2 = vm.createContext({
      ses: ses2,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
    });

    vm.runInContext(qSource, context2);

    // Both original and mutated: ses.ok() true => !ses.ok() false => else runs => ses.makeQ set
    expect(typeof ses2.makeQ).toBe("function");
    const Q = ses2.makeQ();
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    done();
  });
});