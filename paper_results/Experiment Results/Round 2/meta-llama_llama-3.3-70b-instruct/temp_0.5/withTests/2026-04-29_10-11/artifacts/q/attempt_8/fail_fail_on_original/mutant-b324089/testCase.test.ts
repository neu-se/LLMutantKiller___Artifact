import { Q } from "./q";

describe("nearer function", () => {
    it("should return the inspected value of a fulfilled promise", () => {
        const promise = Q(5);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(inspected.value).toBe(5);
        } else {
            expect(true).toBe(false);
        }
    });
});