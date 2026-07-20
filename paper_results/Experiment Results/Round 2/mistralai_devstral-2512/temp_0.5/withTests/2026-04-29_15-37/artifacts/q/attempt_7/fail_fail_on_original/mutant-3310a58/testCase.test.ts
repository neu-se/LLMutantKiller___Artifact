// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3310a58/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack support initialization", () => {
    it("should correctly determine long stack support based on environment", () => {
        // Save the original process object
        const originalProcess = global.process;

        // Test case 1: No process object (browser environment)
        delete (global as any).process;
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(Q1.longStackSupport).toBe(false);

        // Test case 2: Process exists but no env
        (global as any).process = { toString: () => "[object process]" };
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(Q2.longStackSupport).toBe(false);

        // Test case 3: Process with env but no Q_DEBUG
        (global as any).process.env = {};
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q3 = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(Q3.longStackSupport).toBe(false);

        // Test case 4: Process with Q_DEBUG set
        (global as any).process.env.Q_DEBUG = "1";
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const Q4 = require("../../../../../../../../../../../subject_repositories/q/q.js");
        expect(Q4.longStackSupport).toBe(true);

        // Restore original process
        if (originalProcess) {
            global.process = originalProcess;
        } else {
            delete (global as any).process;
        }
    });
});