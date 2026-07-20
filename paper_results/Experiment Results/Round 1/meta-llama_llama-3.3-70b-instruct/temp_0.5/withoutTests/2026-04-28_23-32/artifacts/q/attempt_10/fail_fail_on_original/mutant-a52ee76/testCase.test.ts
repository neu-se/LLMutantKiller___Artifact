import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = 'true';
        const error = new Error('test');
        const promise = Q.reject(error);
        expect(promise.isRejected()).toBe(true);
        delete process.env.Q_DEBUG;
        const error2 = new Error('test2');
        const promise2 = Q.reject(error2);
        expect(promise2.isRejected()).toBe(true);
        expect(Q.longStackSupport).toBe(true);
    });
});