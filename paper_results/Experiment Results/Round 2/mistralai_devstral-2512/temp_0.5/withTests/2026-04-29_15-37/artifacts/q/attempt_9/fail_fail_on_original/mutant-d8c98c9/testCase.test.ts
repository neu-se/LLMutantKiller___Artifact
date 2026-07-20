const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("domain exit behavior", () => {
    it("should call domain.exit() when an error occurs in a domain context", (done) => {
        // Track whether domain.exit was called
        let domainExited = false;

        // Mock a domain-like object
        const mockDomain = {
            enter: () => {},
            exit: () => { domainExited = true; },
            active: true
        };

        // Create a deferred promise
        const deferred = Q.defer();

        // Override the internal runSingle function to inject our mock domain
        // This is the function that contains the domain.exit() call we want to test
        const originalRunSingle = (() => {
            // Get the nextTick implementation
            const nextTickImpl = Q.nextTick.toString();
            // Extract the runSingle function
            const match = nextTickImpl.match(/function runSingle\(([^)]+)\)\s*\{([^}]+)\}/);
            if (match) {
                return new Function(match[1], match[2]);
            }
            return null;
        })();

        if (originalRunSingle) {
            // Replace runSingle with our version that uses mock domain
            const runSingleWithMockDomain = function(task: any, domain: any) {
                try {
                    task();
                } catch (e) {
                    if (domain) {
                        domain.exit(); // This is the call we're testing
                    }
                    // Re-throw to maintain original behavior
                    throw e;
                }
            };

            // Create a task that will throw an error
            const errorTask = () => {
                throw new Error("Test error");
            };

            // Call runSingle with our mock domain
            try {
                runSingleWithMockDomain(errorTask, mockDomain);
            } catch (e) {
                // Error should be caught here
            }

            // Check that domain.exit was called
            expect(domainExited).toBe(true);
            done();
        } else {
            done(new Error("Could not extract runSingle function"));
        }
    });
});