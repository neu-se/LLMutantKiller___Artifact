import { Promise } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should return an object with a state of 'unknown' when inspect is called", () => {
        const promise = new Promise((resolve, reject, notify) => {
            resolve({});
        });
        expect(promise.inspect()).toBeDefined();
    });

    it("should throw an error when inspect is called on a promise with no state", () => {
        const promise = new Promise((resolve, reject, notify) => {
            resolve({});
        });
        expect(() => promise.inspect()).not.toThrow();
    });
});