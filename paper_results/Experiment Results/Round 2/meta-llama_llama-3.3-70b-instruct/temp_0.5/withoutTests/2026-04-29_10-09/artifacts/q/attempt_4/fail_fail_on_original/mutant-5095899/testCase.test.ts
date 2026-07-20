import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a Q promise in a browser environment", () => {
        const global = typeof window!== "undefined"? window : globalThis;
        const previousQ = global.q;
        global.q = q;
        Object.defineProperty(global, 'window', {
            value: undefined,
            writable: false
        });
        Object.defineProperty(global, 'self', {
            value: {},
            writable: false
        });
        expect(() => {
            q(1);
        }).not.toThrow();
        Object.defineProperty(global, 'window', {
            value: undefined,
            writable: true
        });
        Object.defineProperty(global, 'self', {
            value: undefined,
            writable: true
        });
        Object.defineProperty(global, 'window', {
            value: undefined,
            writable: false
        });
        Object.defineProperty(global, 'self', {
            value: undefined,
            writable: false
        });
        expect(() => {
            q(1);
        }).toThrow();
        Object.defineProperty(global, 'window', {
            value: undefined,
            writable: true
        });
        Object.defineProperty(global, 'self', {
            value: undefined,
            writable: true
        });
        global.q = previousQ;
    });
});