import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q script tag behavior", () => {
  it("should throw an error when neither window nor self is defined in script context", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );
    
    // Create a context with no window, no self, no module, no exports, no define, no ses
    const context = vm.createContext({});
    
    expect(() => {
      vm.runInContext(qSource, context);
    }).toThrow("This environment was not anticipated by Q");
  });
});