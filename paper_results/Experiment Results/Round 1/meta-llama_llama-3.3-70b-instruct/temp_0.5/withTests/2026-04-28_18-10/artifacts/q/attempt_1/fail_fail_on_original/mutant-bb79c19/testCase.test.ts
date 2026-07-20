import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nearer function", () => {
    it("should return the fulfillment value of a fulfilled promise", () => {
        const promise = Q(10);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            const result = inspected.value;
            expect(result).toBe(10);
        }
    });
});