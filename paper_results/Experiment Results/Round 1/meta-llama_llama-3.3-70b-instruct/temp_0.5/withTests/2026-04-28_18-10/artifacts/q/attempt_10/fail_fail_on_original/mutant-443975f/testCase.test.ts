import { Q } from "../../../../../../../../subject_repositories/q/q.js";

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

    it("should reject a promise when setImmediate is not a function and nextTick is not defined", async () => {
        const originalSetImmediate = global.setImmediate;
        const originalNextTick = global.process && global.process.nextTick;
        global.setImmediate = undefined;
        if (global.process) {
            global.process.nextTick = undefined;
        }
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            if (typeof setImmediate === "function") {
                setImmediate(() => resolve(10));
            } else if (global.process && typeof global.process.nextTick === "function") {
                global.process.nextTick(() => resolve(10));
            } else {
                reject("setImmediate and nextTick are not defined");
            }
        });
        await expect(promise).rejects.toBe("setImmediate and nextTick are not defined");
        global.setImmediate = originalSetImmediate;
        if (global.process) {
            global.process.nextTick = originalNextTick;
        }
    });
});