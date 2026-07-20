const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecation warning format", () => {
    it("should include 'instead.' in deprecation warning messages", () => {
        // Capture console.warn output
        const originalWarn = console.warn;
        const warnMessages: string[] = [];
        console.warn = (...args: any[]) => {
            warnMessages.push(args.join(' '));
        };

        try {
            // Trigger a deprecation warning by using a deprecated method
            // The valueOf method is deprecated in Q and should trigger the warning
            const promise = Q(42);
            (promise as any).valueOf();

            // Check that we got a warning
            expect(warnMessages.length).toBeGreaterThan(0);

            // Find the deprecation warning (it should contain "instead.")
            const deprecationWarning = warnMessages.find(msg =>
                msg.includes("valueOf") && msg.includes("instead.")
            );

            expect(deprecationWarning).toBeDefined();
            expect(deprecationWarning).toContain("instead.");
        } finally {
            console.warn = originalWarn;
        }
    });
});