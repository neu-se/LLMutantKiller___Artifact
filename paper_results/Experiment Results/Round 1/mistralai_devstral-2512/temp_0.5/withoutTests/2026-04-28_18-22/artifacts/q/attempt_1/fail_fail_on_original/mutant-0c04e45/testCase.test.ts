import { Q } from "./q.js";

describe("Q.async generator support", () => {
  it("should properly handle generator return values in SpiderMonkey style", () => {
    // This test targets the SpiderMonkey generator path in Q.async
    // The mutation removes the actual generator execution, so we test that values are properly yielded

    const result = Q.async(function* () {
      yield Q.delay(10, 1);
      return "success";
    })();

    return result.then(function (value) {
      expect(value).toBe("success");
    });
  });
});