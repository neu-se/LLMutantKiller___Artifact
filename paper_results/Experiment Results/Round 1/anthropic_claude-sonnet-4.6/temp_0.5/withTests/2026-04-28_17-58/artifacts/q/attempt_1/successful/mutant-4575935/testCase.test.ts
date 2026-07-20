import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q browser global assignment", () => {
  it("should assign Q to the window global when window is defined and module/exports are not", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const mockWindow: { Q?: any; previousQ?: any } = {};

    const context = vm.createContext({
      window: mockWindow,
      self: undefined,
      console: console,
    });

    vm.runInContext(qSource, context);

    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
    expect(typeof mockWindow.Q.defer).toBe("function");
    expect(typeof mockWindow.Q.resolve).toBe("function");
  });
});