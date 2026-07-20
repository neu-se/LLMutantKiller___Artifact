const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generator", () => {
  it("should detect mutation by checking StopIteration condition", async () => {
    let conditionChecked = false;
    let conditionResult = false;

    const asyncFn = Q.async(function* () {
      conditionChecked = true;
      conditionResult = (typeof StopIteration === "undefined");
      if (conditionResult) {
        return "original";
      } else {
        return "mutated";
      }
    });

    const result = await asyncFn();
    expect(conditionChecked).toBe(true);
    expect(conditionResult).toBe(true);
    expect(result).toBe("original");
  });
});