import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generator that returns a value via yield chain", () => {
  it("fulfills with the final yielded and returned value", (done) => {
    const asyncFn = Q.async(function* () {
      const val = yield Q.when(5);
      return val * 2;
    });

    asyncFn().then(
      (value: unknown) => {
        expect(value).toBe(10);
        done();
      },
      (err: unknown) => {
        done(new Error("Unexpected rejection: " + err));
      }
    );
  });
});