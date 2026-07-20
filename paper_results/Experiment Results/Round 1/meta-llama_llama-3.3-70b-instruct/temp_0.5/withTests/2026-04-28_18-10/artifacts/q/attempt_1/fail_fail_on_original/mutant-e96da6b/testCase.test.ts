import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
    it("should delay the fulfillment of a promise", () => {
        const promise = Q.delay("what", 50);
        let fulfilled = false;

        promise.then((value) => {
            fulfilled = true;
            expect(value).toBe("what");
        });

        expect(fulfilled).toBe(false);
    });
});