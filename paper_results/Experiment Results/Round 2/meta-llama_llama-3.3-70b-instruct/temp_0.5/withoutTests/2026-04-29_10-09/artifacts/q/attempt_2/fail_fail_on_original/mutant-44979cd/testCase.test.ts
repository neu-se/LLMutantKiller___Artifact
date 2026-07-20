import { Q } from "../q.js";

describe("Q", () => {
  it("should export Q when used as a CommonJS module", () => {
    const exports = {};
    const module = { exports: exports };
    const definition = Q;
    (function (definition) {
      "use strict";
      if (typeof bootstrap === "function") {
        // Montage Require
      } else if (typeof exports === "object" && typeof module === "object") {
        // CommonJS
        module.exports = definition();
      }
    })(definition);
    expect(module.exports).toBeInstanceOf(Function);
  });
});