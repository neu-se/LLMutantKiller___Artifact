import { denodeify } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
  it("should not throw an error when callback is defined", () => {
    const callback = (arg: string, cb: (err: Error | null, result?: string) => void) => {
      cb(null, "success");
    };
    expect(() => {
      const result = denodeify(callback);
      expect(typeof result).toBe("function");
    }).not.toThrow();
  });
});