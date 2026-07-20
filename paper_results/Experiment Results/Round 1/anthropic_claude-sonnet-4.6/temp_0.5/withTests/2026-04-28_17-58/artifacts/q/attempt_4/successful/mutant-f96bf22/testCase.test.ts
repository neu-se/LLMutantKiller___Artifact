import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("filters internal Q frames so the long stack section is shorter than the raw promise stack", () => {
    Q.longStackSupport = true;

    const d = Q.defer();
    const rawPromiseStack: string = (d.promise as any).stack || "";

    d.reject(new Error("test error"));

    return d.promise.then(
      () => {
        Q.longStackSupport = false;
        throw new Error("unexpected fulfillment");
      },
      (err: any) => {
        Q.longStackSupport = false;
        const errorStack: string = err.stack || "";

        expect(rawPromiseStack).toBeTruthy();
        expect(errorStack).toContain("From previous event:");

        const rawPromiseLines = rawPromiseStack
          .split("\n")
          .filter((l: string) => l.trim().length > 0);

        const afterSeparator = errorStack
          .split("From previous event:")
          .slice(1)
          .join("From previous event:");

        const filteredLines = afterSeparator
          .split("\n")
          .filter((l: string) => l.trim().length > 0);

        // Original: isInternalFrame removes q.js frames from promise.stack
        //   → filteredLines.length < rawPromiseLines.length
        // Mutation (if true): all lines kept, nothing removed
        //   → filteredLines.length == rawPromiseLines.length
        expect(filteredLines.length).toBeLessThan(rawPromiseLines.length);
      }
    );
  });
});