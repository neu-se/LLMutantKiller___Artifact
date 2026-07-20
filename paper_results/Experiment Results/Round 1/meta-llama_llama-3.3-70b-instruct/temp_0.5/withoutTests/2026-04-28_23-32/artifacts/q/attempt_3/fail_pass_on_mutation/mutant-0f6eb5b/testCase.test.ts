import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have long stack support enabled when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const promise = Q.defer().promise;
        const error = new Error();
        promise.then(null, () => { throw error; });
        expect(promise.catch(e => e.stack).then(stack => stack.includes("Q")).then(result => result)).resolves.toBe(true);
    });
});