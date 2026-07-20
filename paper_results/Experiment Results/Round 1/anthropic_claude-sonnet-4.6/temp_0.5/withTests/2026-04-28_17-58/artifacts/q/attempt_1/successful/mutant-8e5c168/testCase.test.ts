import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise", () => {
  it("should resolve with the value passed to the resolve callback", () => {
    return new Promise<void>((done, fail) => {
      const result = Q.promise(function (resolve: (value: number) => void) {
        resolve(42);
      });

      result.then(
        function (value: number) {
          expect(value).toBe(42);
          done();
        },
        function (err: unknown) {
          fail(err);
        }
      );
    });
  });
});