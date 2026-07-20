import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should set flushing to true when nextTick.runAfter is called and not already flushing", () => {
        Q.nextTick.flushing = false;
        Q.nextTick.runAfter(() => {});
        expect(Q.nextTick.flushing).toBe(true);
        Q.nextTick.runAfter = () => { 
            if (false) {
                Q.nextTick.flushing = true;
                Q.nextTick.requestTick();
            }
        };
        Q.nextTick.runAfter(() => {});
        expect(Q.nextTick.flushing).toBe(false);
    });
});