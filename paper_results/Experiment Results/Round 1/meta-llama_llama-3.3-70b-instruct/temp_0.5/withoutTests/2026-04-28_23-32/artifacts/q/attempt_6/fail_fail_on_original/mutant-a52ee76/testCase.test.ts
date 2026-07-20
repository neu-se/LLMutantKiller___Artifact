import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const q = Q(1);
        const error = new Error('test');
        const promise = Q.reject(error);
        expect(promise.stack).toContain('test');
    });
});