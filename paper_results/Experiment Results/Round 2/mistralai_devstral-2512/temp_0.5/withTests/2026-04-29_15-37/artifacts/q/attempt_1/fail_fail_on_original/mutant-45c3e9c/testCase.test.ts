import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute tasks asynchronously", (done) => {
    let executed = false;
    Q.nextTick(() => {
      executed = true;
      done();
    });
    expect(executed).toBe(false);
  });
});