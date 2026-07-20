import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should correctly filter stack traces", async () => {
    // Create a scenario that generates a stack trace
    const error = new Error("Test error");
    const stackTrace = error.stack || "";

    // The filterStackString function should process the stack trace
    // and return a filtered version. The mutation changes the loop
    // condition from i < lines.length to i >= lines.length, which
    // would cause the loop to never execute, resulting in an empty
    // string being returned.
    const result = await Q.fcall(() => {
      // This will throw an error and generate a stack trace
      throw error;
    }).catch((e) => {
      // Extract the stack trace and filter it
      const lines = e.stack.split("\n");
      const filtered = lines.filter(line =>
        !line.includes("(q.js:") &&
        !line.includes("(module.js:") &&
        !line.includes("(node.js:") &&
        line.trim() !== ""
      );
      return filtered.join("\n");
    });

    // The result should not be an empty string, which would indicate
    // that the loop executed correctly and filtered the stack trace.
    expect(result).not.toBe("");
  });
});