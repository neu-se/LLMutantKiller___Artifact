import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method with process.domain", () => {
    it("should bind onUnhandledError to process.domain when it exists", (done) => {
        // Create a mock process object with domain but process itself is falsy
        const originalProcess = global.process;
        const mockDomain = {
            bind: jest.fn((fn) => fn)
        };

        // Set up a mock process that has domain but is not truthy
        global.process = Object.create(null);
        global.process.domain = mockDomain;

        const deferred = Q.defer();
        const error = new Error("test error");

        Q.onerror = (err) => {
            expect(err).toBe(error);
            expect(mockDomain.bind).toHaveBeenCalled();
            // Restore original process
            global.process = originalProcess;
            done();
        };

        deferred.promise.done();
        deferred.reject(error);
    });
});