import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should resolve a promise with setImmediate", async () => {
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            if (typeof setImmediate === "function") {
                setImmediate(() => resolve(10));
            } else {
                setTimeout(() => resolve(10), 0);
            }
        });
        await expect(promise).resolves.toBe(10);
    });

    it("should reject a promise when setImmediate is not a function", async () => {
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = undefined;
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            if (typeof setImmediate === "function") {
                setImmediate(() => resolve(10));
            } else {
                reject("setImmediate is not a function");
            }
        });
        await expect(promise).rejects.toThrow("setImmediate is not a function");
        global.setImmediate = originalSetImmediate;
    });
});