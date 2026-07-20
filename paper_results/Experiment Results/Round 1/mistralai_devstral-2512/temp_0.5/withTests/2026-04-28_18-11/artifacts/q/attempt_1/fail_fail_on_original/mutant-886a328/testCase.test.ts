import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.noConflict behavior", () => {
  it("should throw an error with a specific message when called in Node.js", () => {
    expect(() => {
      Q.noConflict();
    }).toThrow("Q.noConflict only works when Q is used as a global");
  });
});