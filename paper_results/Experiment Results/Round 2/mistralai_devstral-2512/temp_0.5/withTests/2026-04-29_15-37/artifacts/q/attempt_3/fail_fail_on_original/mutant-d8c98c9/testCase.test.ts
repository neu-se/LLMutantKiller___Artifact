const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("domain exit behavior", () => {
    it("should exit domain after task execution in Node environment", (done) => {
        // Create a mock domain object
        const mockDomain = {
            enter: jest.fn(),
            exit: jest.fn(),
            active: true
        };

        // Mock process.domain to simulate Node.js domain environment
        const originalProcess = global.process;
        global.process = {
            ...originalProcess,
            domain: mockDomain,
            nextTick: (callback: any) => {
                setTimeout(callback, 0);
            }
        };

        // Create a deferred and trigger an error in a domain context
        const deferred = Q.defer();

        // Override the runSingle function to track domain exit calls
        const originalRunSingle = (Q as any).nextTick.toString().includes('runSingle') ?
            (() => {
                const nextTickModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
                return nextTickModule.__esModule ? nextTickModule.default : nextTickModule;
            })().nextTick.toString().match(/function runSingle\(([^)]+)\)/)[1] : null;

        // Force the error path by creating a task that throws
        Q.nextTick(() => {
            throw new Error("Test error");
        });

        // Give some time for async operations to complete
        setTimeout(() => {
            // In the original code, domain.exit() should be called when an error occurs
            // In the mutated code, it won't be called
            expect(mockDomain.exit).toHaveBeenCalled();

            // Restore original process
            global.process = originalProcess;

            done();
        }, 100);
    });
});