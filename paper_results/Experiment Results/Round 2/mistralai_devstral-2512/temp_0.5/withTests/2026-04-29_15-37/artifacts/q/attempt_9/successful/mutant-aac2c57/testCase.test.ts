// Test case to detect the mutation in the `done` method of Q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method with process.domain", () => {
    it("should only bind onUnhandledError when process and process.domain both exist", () => {
        // Test case 1: process exists but process.domain is undefined
        const mockProcessNoDomain = {
            nextTick: (fn: any) => fn()
        };

        let originalProcess = global.process;
        global.process = mockProcessNoDomain as any;

        const mockDomain = {
            bind: jest.fn((fn: any) => fn),
            enter: jest.fn(),
            exit: jest.fn()
        };

        // Create a resolved promise
        const promise1 = Q.resolve(42);
        promise1.done();

        // Verify bind was NOT called (because process.domain doesn't exist)
        expect(mockDomain.bind).not.toHaveBeenCalled();

        // Test case 2: process exists and process.domain exists
        const mockProcessWithDomain = {
            domain: mockDomain,
            nextTick: (fn: any) => fn()
        };

        global.process = mockProcessWithDomain as any;

        const promise2 = Q.resolve(42);
        promise2.done();

        // Verify bind WAS called (because both process and process.domain exist)
        expect(mockDomain.bind).toHaveBeenCalled();

        // Restore original process
        global.process = originalProcess;
    });
});