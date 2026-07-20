describe("Q uses MessageChannel when available", () => {
  it("constructs a MessageChannel instance during initialization", () => {
    jest.resetModules();

    let messageChannelConstructed = false;
    const OriginalMessageChannel = (global as any).MessageChannel;

    if (typeof OriginalMessageChannel === "undefined") {
      return; // skip if not available
    }

    (global as any).MessageChannel = class extends OriginalMessageChannel {
      constructor() {
        super();
        messageChannelConstructed = true;
      }
    };

    require("../../../../../../../../../../../subject_repositories/q/q.js");

    (global as any).MessageChannel = OriginalMessageChannel;

    expect(messageChannelConstructed).toBe(true);
  });
});