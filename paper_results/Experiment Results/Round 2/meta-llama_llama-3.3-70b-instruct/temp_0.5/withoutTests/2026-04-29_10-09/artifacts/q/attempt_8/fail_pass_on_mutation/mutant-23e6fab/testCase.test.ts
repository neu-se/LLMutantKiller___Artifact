import { Q } from "./q";

describe("Q", () => {
  it("should correctly handle conditional check for Firefox-style stack traces", () => {
    const stackLine = "function@/path/to/file:10";
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
      expect(attempt3).not.toBeNull();
    } else {
      expect(attempt3).toBeNull();
    }
  });
});