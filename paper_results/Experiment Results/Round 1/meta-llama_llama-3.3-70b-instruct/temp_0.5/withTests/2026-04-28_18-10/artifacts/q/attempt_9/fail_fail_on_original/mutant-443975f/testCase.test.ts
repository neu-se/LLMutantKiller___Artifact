import { Q } from "../../../q";

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
});