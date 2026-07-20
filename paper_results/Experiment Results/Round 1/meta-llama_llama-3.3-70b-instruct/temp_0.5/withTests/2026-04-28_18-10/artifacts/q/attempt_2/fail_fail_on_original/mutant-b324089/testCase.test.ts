import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
    it("should return the fulfillment value of a fulfilled promise", () => {
        const promise = Q.resolve(10);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            const result = inspected.value;
            expect(result).toBe(10);
        }
    });

    it("should return undefined when the promise is not fulfilled", () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            const result = inspected.value;
            expect(result).toBeUndefined();
        }
    });
});