import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules initialization", () => {
  it("should not return 't' for input 'S' due to spurious initial rule", () => {
    expect(plural("S")).not.toBe("t");
    expect(plural("S")).toBe("Ses");
  });
});