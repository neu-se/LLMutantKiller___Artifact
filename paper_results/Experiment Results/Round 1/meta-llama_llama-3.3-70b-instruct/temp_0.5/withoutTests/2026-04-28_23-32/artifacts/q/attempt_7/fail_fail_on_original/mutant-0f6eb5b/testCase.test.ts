import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have long stack support enabled when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const promise = Q.defer().promise;
        const error = new Error();
        promise.then(null, () => { throw error; });
        return promise.catch((e: Error) => {
            if (e.stack) {
                const stackLines: string[] = e.stack.split('\n');
                expect(stackLines.length).toBeGreaterThan(10); // adjust the number as needed
            } else {
                expect(e.stack).not.toBeNull();
            }
        });
    }, 10000);
});