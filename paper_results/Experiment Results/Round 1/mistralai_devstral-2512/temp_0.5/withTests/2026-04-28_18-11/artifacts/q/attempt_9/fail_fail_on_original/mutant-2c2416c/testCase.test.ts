const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecation warning format", () => {
    it("should include 'instead.' in deprecation warnings", () => {
        // Capture console.warn output
        const originalWarn = console.warn;
        const warnings: string[] = [];
        console.warn = (...args: any[]) => {
            warnings.push(args.join(' '));
        };

        try {
            // We need to trigger an actual deprecation warning
            // Looking at the Q source code, we can see that Q.longStackSupport is deprecated
            // and uses the deprecate function internally

            // First access to set it (this might trigger the warning)
            const initialValue = Q.longStackSupport;

            // Second access to potentially trigger another warning
            Q.longStackSupport = initialValue;

            // Check if we got any warnings containing "instead."
            const hasInsteadWarning = warnings.some(w =>
                w.includes("instead.")
            );

            // The original code should produce warnings with "instead."
            // The mutated code should not
            expect(hasInsteadWarning).toBe(true);

        } finally {
            console.warn = originalWarn;
        }
    });
});