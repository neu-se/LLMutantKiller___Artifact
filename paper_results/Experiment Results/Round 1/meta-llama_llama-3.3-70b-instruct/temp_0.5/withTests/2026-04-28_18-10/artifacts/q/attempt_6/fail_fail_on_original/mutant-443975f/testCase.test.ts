import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should resolve a promise with setImmediate", async () => {
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            if (typeof globalThis.setImmediate === "function") {
                globalThis.setImmediate(() => resolve(10));
            } else {
                globalThis.setTimeout(() => resolve(10), 0);
            }
        });
        await expect(promise).resolves.toBe(10);
    });
});