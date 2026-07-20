import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString via long stack traces", () => {
    it("should produce a non-undefined stack trace on rejection when longStackSupport is enabled", () => {
        Q.longStackSupport = true;

        return new Promise<void>((resolve, reject) => {
            Q.reject(new Error("test error"))
                .then(null, function (err: Error) {
                    try {
                        // With the original code, makeStackTraceLong sets error.stack
                        // to the result of filterStackString, which returns a string.
                        // With the mutated code, filterStackString returns undefined,
                        // so error.stack would be set to undefined.
                        expect(typeof err.stack).toBe("string");
                        expect(err.stack).not.toBeUndefined();
                        expect(err.stack!.length).toBeGreaterThan(0);
                        resolve();
                    } catch (e) {
                        reject(e);
                    } finally {
                        Q.longStackSupport = false;
                    }
                });
        });
    });
});