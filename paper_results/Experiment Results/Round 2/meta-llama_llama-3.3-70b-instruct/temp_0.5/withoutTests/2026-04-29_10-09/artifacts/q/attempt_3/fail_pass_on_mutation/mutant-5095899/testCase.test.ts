import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a Q promise in a browser environment", () => {
        const global = typeof window!== "undefined"? window : globalThis;
        const previousQ = global.q;
        global.q = q;
        const qPromise = q(1);
        expect(qPromise).toBeInstanceOf(Object);
        expect(qPromise.then).toBeInstanceOf(Function);
        expect(qPromise.catch).toBeInstanceOf(Function);
        global.q = previousQ;
    });
});