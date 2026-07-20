import * as fs from "fs";
import * as path from "path";

describe("Q ses environment condition", () => {
  it("should initialize Q in window environment when ses.ok() returns false", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const mockWindow: any = {};
    const mockSes = { ok: () => false };

    const result = new Function(
      "bootstrap", "exports", "module", "define", "ses", "window", "self",
      `${qSource}; return window.Q;`
    )(undefined, undefined, undefined, undefined, mockSes, mockWindow, undefined);

    // Original: if (!ses.ok()) => !false => true => enters block, sets window.Q
    // Mutated:  if (ses.ok())  => false  => false => skips block, window.Q not set
    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
  });
});