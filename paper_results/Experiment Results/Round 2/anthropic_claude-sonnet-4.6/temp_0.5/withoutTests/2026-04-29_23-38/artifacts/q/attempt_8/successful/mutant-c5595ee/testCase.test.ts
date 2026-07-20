import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q attempt3 regex", () => {
  it("should handle Firefox-style anonymous frames with zero chars before @", async () => {
    Q.longStackSupport = true;

    const probe = Q.defer();
    const probeStack: string = probe.promise.stack || "";

    // Extract Q's file path from the deferred's stack
    let qFile = "";
    for (const line of probeStack.split("\n")) {
      const m = /\((.+q\.js):(\d+):\d+\)/.exec(line);
      if (m) {
        qFile = m[1];
        break;
      }
    }

    if (!qFile) {
      throw new Error("Could not determine Q file path from: " + probeStack);
    }

    const d = Q.defer();
    // Zero chars before @: original /.*@/ matches, mutated /.@/ does NOT
    // This simulates a Firefox anonymous function frame pointing to Q's file
    d.promise.stack = `@${qFile}:500`;
    d.promise.stackCounter = 1;

    const testError = new Error("test");
    Object.defineProperty(testError, "stack", {
      value: "Error: test\n    at Context.<anonymous> (/test/file.js:1:1)",
      configurable: true,
      writable: true,
    });

    d.reject(testError);

    let caughtError: any;
    await d.promise.then(null, (e: any) => { caughtError = e; });

    const finalStack: string = caughtError?.stack ?? "";

    // Original: "@qFile:500" parsed by attempt3 (.*@ matches 0 chars)
    //           -> isInternalFrame=true -> filtered OUT -> not in finalStack
    // Mutated:  "@qFile:500" NOT parsed (.@ needs exactly 1 char before @)
    //           -> isInternalFrame=false -> kept IN -> appears in finalStack
    expect(finalStack).not.toContain(`@${qFile}:500`);
  });
});