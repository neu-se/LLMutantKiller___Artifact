import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should properly build stack traces when promise chain has multiple levels", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let error: Error | undefined;

    function level1() {
      return Q().then(() => level2());
    }

    function level2() {
      return new (Q as any).Promise((resolve: any, reject: any) => {
        level3().then(resolve, reject);
      });
    }

    function level3() {
      return new (Q as any).Promise((resolve: any, reject: any) => {
        setTimeout(() => {
          reject(new Error("Test error"));
        }, 0);
      });
    }

    try {
      await level1();
    } catch (err) {
      error = err as Error;
    }

    expect(error).toBeDefined();
    expect(error!.stack).toBeDefined();

    // The stack should contain references to all three levels
    const stack = error!.stack!;
    expect(stack).toMatch(/level3/);
    expect(stack).toMatch(/level2/);
    expect(stack).toMatch(/level1/);

    // Verify the stack contains the expected separator for long stacks
    expect(stack).toContain("From previous event:");

    Q.longStackSupport = false;
  });
});