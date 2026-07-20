import { Q } from "./q.js";

describe("Q", () => {
    it("should pass when process is an object", () => {
        const originalProcess = global.process;
        global.process = { domain: {} };
        const promise = Q.resolve();
        expect(() => promise.done()).not.toThrow();
        global.process = originalProcess;
    });

    it("should fail when process is not an object", () => {
        const originalProcess = global.process;
        global.process = "";
        const promise = Q.resolve();
        expect(() => promise.done()).toThrow();
        global.process = originalProcess;
    });
});