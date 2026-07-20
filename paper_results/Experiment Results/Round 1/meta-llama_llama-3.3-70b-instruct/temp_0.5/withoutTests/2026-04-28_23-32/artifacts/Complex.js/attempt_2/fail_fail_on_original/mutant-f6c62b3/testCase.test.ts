import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should have the correct ES module definition", () => {
    const complexModule = require("./complex.js");
    expect(complexModule.__esModule).toBe(true);
  });
});