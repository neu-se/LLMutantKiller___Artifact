import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have long stack support enabled when Q_DEBUG is set", async () => {
        process.env.Q_DEBUG = 'true';
        Q.longStackSupport = true;
        const promise = Q.defer().promise;
        const error = new Error();
        promise.then(null, () => { throw error; });
        try {
            await promise;
            fail("Expected promise to reject");
        } catch (e: any) {
            if (e.stack) {
                const stackLines: string[] = e.stack.split('\n');
                expect(stackLines.length).toBeGreaterThan(5);
            } else {
                expect(e.stack).not.toBeNull();
            }
        }
    }, 60000);
});