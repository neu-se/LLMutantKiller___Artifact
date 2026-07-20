import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q library", () => {
    it("should handle setImmediate correctly", () => {
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        expect(called).toBe(false);
        // Force the next tick to happen
        Q.nextTick(() => {});
        expect(called).toBe(true);

        // Test the mutation
        let setImmediateCalled = false;
        (global as any).setImmediate = () => {
            setImmediateCalled = true;
        };
        Q.nextTick(() => {});
        expect(setImmediateCalled).toBe(true);
    });
});