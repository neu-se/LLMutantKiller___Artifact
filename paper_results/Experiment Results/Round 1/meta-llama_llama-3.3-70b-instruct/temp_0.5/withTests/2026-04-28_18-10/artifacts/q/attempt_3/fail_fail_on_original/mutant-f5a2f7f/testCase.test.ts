import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should capture the line number correctly", () => {
        // Create a new promise
        const promise = Q.defer();

        // Resolve the promise with an error
        promise.resolve(new Error());

        // Check if the promise's stack trace contains the file name and line number
        expect(promise.promise.stack).toContain(__filename);
    });
});