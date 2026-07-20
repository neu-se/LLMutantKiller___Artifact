import { Q } from "./q.js";

describe("domain exit behavior", () => {
    it("should exit domain after task execution in Node environment", (done) => {
        // This test is designed to detect the mutation where domain.exit() is not called
        // We simulate a Node.js domain environment and verify that the domain is properly exited

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
            nextTick: (callback) => {
                // Simulate nextTick behavior
                setTimeout(callback, 0);
            }
        } as any;

        // Mock isNodeJS to true
        const nextTick = (Q as any).nextTick;
        (Q as any).nextTick = function(task) {
            // Simulate the behavior where domain should be exited
            const head = { task: void 0, next: null };
            const tail = head;
            tail.next = { task: task, domain: mockDomain, next: null };

            // Call the task
            task();

            // In the original code, domain.exit() should be called
            // In the mutated code, it won't be called
            return nextTick(task);
        };

        // Create a task that should trigger domain exit
        const testTask = jest.fn();

        // Execute the task through Q.nextTick
        Q.nextTick(testTask);

        // Give some time for async operations to complete
        setTimeout(() => {
            // Verify that domain.exit() was called
            expect(mockDomain.exit).toHaveBeenCalled();

            // Restore original process
            global.process = originalProcess;

            done();
        }, 100);
    });
});