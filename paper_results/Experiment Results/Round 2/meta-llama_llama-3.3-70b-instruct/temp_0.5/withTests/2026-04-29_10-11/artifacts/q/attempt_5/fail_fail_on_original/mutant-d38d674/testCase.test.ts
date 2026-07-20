import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor", () => {
    it("should handle fallback correctly", () => {
        const promise = Q.Promise({}, undefined);
        return promise.then(
            (value: any) => {
                expect(value).toBeUndefined();
            },
            (error: any) => {
                throw new Error("Promise should not be rejected");
            }
        );
    });
});