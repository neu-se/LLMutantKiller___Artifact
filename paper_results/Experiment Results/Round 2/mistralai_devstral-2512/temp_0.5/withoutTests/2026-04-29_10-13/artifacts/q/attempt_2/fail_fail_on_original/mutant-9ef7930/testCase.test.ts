import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race mutation test", () => {
  it("should handle empty array correctly", (done) => {
    Q.race([]).then(
      () => {
        done(new Error("Promise should not resolve for empty array"));
      },
      () => {
        done();
      }
    ).catch((err: unknown) => {
      done(err as Error);
    });
  });
});