import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should remove the rejection from unhandledReasons after it is handled", async () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection");
    const p = Q.reject(error);

    // Allow the rejection to be tracked as unhandled
    await new Promise<void>(resolve => setImmediate(resolve));
    await new Promise<void>(resolve => setImmediate(resolve));

    // Now handle the rejection - this triggers untrackRejection
    p.fail(() => "handled");

    // Allow untrackRejection to run
    await new Promise<void>(resolve => setImmediate(resolve));
    await new Promise<void>(resolve => setImmediate(resolve));
    await new Promise<void>(resolve => setImmediate(resolve));

    // In original: splice runs because process.emit === "function" is true
    // In mutated: splice does NOT run because process.emit !== "function" is false in Node
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});