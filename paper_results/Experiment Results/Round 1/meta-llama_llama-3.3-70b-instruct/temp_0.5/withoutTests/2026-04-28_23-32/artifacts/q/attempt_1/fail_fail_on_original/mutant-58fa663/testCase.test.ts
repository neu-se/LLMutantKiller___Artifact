import { Q } from "../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly handle unhandled rejections", () => {
        const promise = Q.reject("Test rejection");
        const unhandledRejections = [];
        const originalEmit = process.emit;
        process.emit = (event, ...args) => {
            if (event === "unhandledRejection") {
                unhandledRejections.push(args);
            }
        };
        Q.untrackRejection(promise);
        expect(unhandledRejections.length).toBe(0);
        process.emit = originalEmit;
    });
});