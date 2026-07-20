import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should throw an error when trying to access a property with an empty string as the property name", () => {
        const error = new Error();
        object_defineProperty(error, "", { value: 1, configurable: true });
        expect(() => {
            const _ = error[""];
        }).toThrowError();
    });
});