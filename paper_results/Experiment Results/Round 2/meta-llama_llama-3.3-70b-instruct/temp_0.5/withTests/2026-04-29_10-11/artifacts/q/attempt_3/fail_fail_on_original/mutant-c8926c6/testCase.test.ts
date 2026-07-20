import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick function", () => {
    it("should behave as expected", () => {
        const originalProcessNextTick = process.nextTick;
        jest.spyOn(process, 'nextTick').mockImplementationOnce(() => {
            throw new Error('Mocked process.nextTick');
        });
        expect(() => Q.nextTick(() => {})).toThrowError('Mocked process.nextTick');
        jest.restoreAllMocks();
        expect(Q.nextTick(() => {})).not.toThrow();
    });
});