import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a Q promise in a browser environment", () => {
        jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);
        jest.spyOn(global, 'self', 'get').mockImplementation(() => {});
        expect(() => {
            q(1);
        }).not.toThrow();
        jest.restoreAllMocks();
    });
});