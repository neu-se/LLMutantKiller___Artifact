// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_7/pending_category/mutant-ae354e2/testCase.test.ts
const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function warning message", () => {
  it("should include 'is deprecated, use' in the warning message", () => {
    // Get the internal deprecate function by accessing the module's source
    const fs = require('fs');
    const qSource = fs.readFileSync("../../../../../../../../../../../subject_repositories/q/q.js", 'utf8');

    // Extract the deprecate function from the source
    const deprecateMatch = qSource.match(/function deprecate\\(callback, name, alternative\\) \\{([^}]+)\\}/);
    if (!deprecateMatch) {
      throw new Error("Could not find deprecate function in source");
    }

    // Create a test environment
    const originalWarn = console.warn;
    const warnMessages: string[] = [];
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(' '));
    };

    // Execute the deprecate function in our test context
    const callback = () => "test";
    eval(`
      ${deprecateMatch[0]}
      const deprecatedFunc = deprecate(callback, "oldFunc", "newFunc");
      deprecatedFunc();
    `);

    console.warn = originalWarn;

    expect(warnMessages.some(msg => msg.includes("oldFunc is deprecated, use newFunc"))).toBe(true);
  });
});