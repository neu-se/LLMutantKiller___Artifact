import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done flag", () => {
  it("test", async () => {
    const d = Q.defer();
    let count = 0;

    d.promise.then(null, () => { count++; return 42; });

    // Multiple await cycles to ensure Q tasks complete
    for (let i = 0; i < 10; i++) {
      await Promise.resolve();
    }

    d.notify("x");
    d.notify("y");

    for (let i = 0; i < 10; i++) {
      await Promise.resolve();
    }

    expect(count).toBe(1);
  });
});