import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise constructor", () => {
  it("should throw TypeError when resolver is not a function", () => {
    expect(() => {
      new Q.Promise("not a function");
    }).toThrow(TypeError);
  });
});