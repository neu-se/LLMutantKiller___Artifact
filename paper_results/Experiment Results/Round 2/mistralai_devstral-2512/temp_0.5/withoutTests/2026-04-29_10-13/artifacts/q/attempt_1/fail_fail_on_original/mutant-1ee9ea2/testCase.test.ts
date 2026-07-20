import { Q } from "./q.js";

describe("Q.async with ES6 generators", () => {
  it("should resolve with the returned value from a generator", async () => {
    const asyncFn = Q.async(function* () {
      yield Q.delay(10);
      return "success";
    });

    const result = await asyncFn();
    expect(result).toBe("success");
  });
});