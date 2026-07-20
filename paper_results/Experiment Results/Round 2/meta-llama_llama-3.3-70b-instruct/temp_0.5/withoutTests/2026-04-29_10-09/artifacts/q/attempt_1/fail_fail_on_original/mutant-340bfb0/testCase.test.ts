import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should throw an error when trying to define a property with an empty string as the property name", () => {
        expect(() => {
            const error = new Error();
            Object.defineProperty(error, "", { value: 1, configurable: true });
        }).toThrowError(TypeError);
    });
});