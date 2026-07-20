import { Q } from '../../q';

describe("Promise constructor", () => {
    it("should handle fallback correctly", () => {
        const fallback = (op: string) => {
            if (op !== "when") {
                return Q.reject(new Error("Promise does not support operation: " + op));
            } else {
                return Q.resolve();
            }
        };
        const promise = Q.Promise({}, fallback);
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