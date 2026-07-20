import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should resolve with the given value", () => {
        return Q(5).then((value) => {
            expect(value).toBe(5);
        });
    });

    it("should reject with the given reason", () => {
        return Q.reject(new Error("Test error")).catch((error) => {
            expect(error.message).toBe("Test error");
        });
    });

    it("should handle promises correctly", () => {
        return Q(Q(5)).then((value) => {
            expect(value).toBe(5);
        });
    });

    it("should handle thenables correctly", () => {
        const thenable = {
            then: (resolve) => {
                resolve(10);
            },
        };
        return Q(thenable).then((value) => {
            expect(value).toBe(10);
        });
    });
});