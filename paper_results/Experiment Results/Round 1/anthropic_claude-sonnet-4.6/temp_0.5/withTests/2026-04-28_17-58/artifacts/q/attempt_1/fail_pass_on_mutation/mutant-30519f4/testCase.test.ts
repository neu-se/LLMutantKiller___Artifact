import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with already-fulfilled promises", () => {
  it("should resolve with correct values when given already-fulfilled promises", (done) => {
    // Create already-fulfilled promises
    const p1 = Q(1);
    const p2 = Q(2);
    const p3 = Q(3);

    // Verify they are indeed fulfilled synchronously
    expect(p1.inspect().state).toBe("fulfilled");
    expect(p2.inspect().state).toBe("fulfilled");
    expect(p3.inspect().state).toBe("fulfilled");

    Q.all([p1, p2, p3]).then(
      function (values: number[]) {
        expect(values).toEqual([1, 2, 3]);
        done();
      },
      function (err: unknown) {
        done(new Error("Q.all should not have rejected: " + err));
      }
    );
  });
});