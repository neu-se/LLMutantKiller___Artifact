import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have long stack support enabled when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const promise = Q.defer().promise;
        const error = new Error();
        promise.then(null, () => { throw error; });
        return promise.catch((e: Error) => {
            const stackLines: string[] = e.stack.split('\n');
            const expectedLine: string | undefined = stackLines.find((line: string) => line.includes('q.js'));
            expect(expectedLine).not.toBeNull();
        });
    });
});