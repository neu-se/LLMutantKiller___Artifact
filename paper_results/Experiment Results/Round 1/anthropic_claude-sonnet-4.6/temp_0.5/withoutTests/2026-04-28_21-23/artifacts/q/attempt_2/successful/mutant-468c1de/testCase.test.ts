import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should not add stacks from promises created after the minimum stack counter", async () => {
    Q.longStackSupport = true;

    const SEPARATOR = "From previous event:";
    const capturedStacks: string[] = [];

    const d = Q.defer();

    const p1 = d.promise.then(null, (err: any) => {
      capturedStacks.push(err.stack || "");
      throw err;
    });

    const p2 = p1.then(null, (err: any) => {
      capturedStacks.push(err.stack || "");
      return "recovered";
    });

    d.reject(new Error("test rejection"));

    await p2;

    Q.longStackSupport = false;

    expect(capturedStacks.length).toBe(2);

    const countSeparators = (s: string) =>
      (s.match(new RegExp(SEPARATOR, "g")) || []).length;

    const count0 = countSeparators(capturedStacks[0]);
    const count1 = countSeparators(capturedStacks[1]);

    // With original code: second makeStackTraceLong call does not add p1's stack
    // because p1.stackCounter > __minimumStackCounter__ (established in first call)
    // Therefore count1 === count0
    //
    // With mutated code: condition is always true, so p1's stack is always added
    // Therefore count1 > count0
    expect(count1).toBe(count0);
  });
});