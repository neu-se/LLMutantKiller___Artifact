import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should correctly define a property on an error object with a valid property name", () => {
        const error = new Error();
        Object.defineProperty(error, "__minimumStackCounter__", { value: 1, configurable: true });
        expect(error.__minimumStackCounter__).toBe(1);
    });
});