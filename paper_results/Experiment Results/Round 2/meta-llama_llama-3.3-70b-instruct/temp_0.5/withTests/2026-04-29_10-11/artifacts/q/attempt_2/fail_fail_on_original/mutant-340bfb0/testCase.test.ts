import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should not throw an error when trying to set a property on an error object with a valid property name", () => {
        const error = new Error();
        const promise = Q();
        expect(() => {
            object_defineProperty(error, "__minimumStackCounter__", { value: promise.stackCounter, configurable: true });
        }).not.toThrowError();
    });

    it("should throw an error when trying to set a property on an error object with an empty string as the property name in the mutated code", () => {
        const error = new Error();
        const promise = Q();
        expect(() => {
            object_defineProperty(error, "", { value: promise.stackCounter, configurable: true });
        }).toThrowError();
    });
});