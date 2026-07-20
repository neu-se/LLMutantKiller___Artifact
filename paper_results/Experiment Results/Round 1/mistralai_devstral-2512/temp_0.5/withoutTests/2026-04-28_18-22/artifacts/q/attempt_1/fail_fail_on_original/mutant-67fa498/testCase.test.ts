import { Q } from "./q";

describe("Q.nextTick.runAfter", () => {
  it("should execute tasks added via runAfter", (done) => {
    let executed = false;
    Q.nextTick.runAfter(() => {
      executed = true;
      done();
    });
    expect(executed).toBe(false);
  });
});