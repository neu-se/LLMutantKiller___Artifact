import { Q } from "./q.js";

describe("Q.race mutation test", () => {
  it("should handle empty array correctly", (done) => {
    Q.race([]).then(
      () => {
        done(new Error("Promise should not resolve for empty array"));
      },
      () => {
        done();
      }
    ).catch((err) => {
      done(err);
    });
  });
});