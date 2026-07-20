import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should handle null rejection reason without throwing when longStackSupport is true", async () => {
        Q.longStackSupport = true;

        let caughtError: any = undefined;
        let completed = false;

        await new Promise<void>((resolve) => {
            Q.reject(null).then(null, function(e: any) {
                caughtError = e;
                completed = true;
                resolve();
            });
        });

        expect(completed).toBe(true);
        expect(caughtError).toBeNull();
    });
});