import { MessagesService } from "./messages";
import { Triggers } from "./triggers";
import * as TDB from "../__tests__/testDataBuilder";

describe("messages service", () => {
  const mockTriggers: jest.Mocked<Triggers> = {
    customMessage: jest.fn(),
    enabled: jest.fn(),
    postConfirmation: jest.fn(),
    userMigration: jest.fn(),
  };

  const user = TDB.user();

  it.todo("authentication");

  describe("forgotPassword", () => {
    describe("CustomMessage lambda is configured", () => {
      describe("lambda returns a custom message", () => {
        it("returns the custom message and code", async () => {
          mockTriggers.enabled.mockReturnValue(true);
          mockTriggers.customMessage.mockResolvedValue({
            smsMessage: "sms",
            emailSubject: "email subject",
            emailMessage: "email",
          });

          const messages = new MessagesService(mockTriggers);
          const message = await messages.forgotPassword(
            "clientId",
            "userPoolId",
            user,
            "1234"
          );

          expect(message).toMatchObject({
            __code: "1234",
            smsMessage: "sms",
            emailSubject: "email subject",
            emailMessage: "email",
          });
        });
      });

      describe("lambda does not return a custom message", () => {
        it("returns just the code", async () => {
          mockTriggers.enabled.mockReturnValue(true);
          mockTriggers.customMessage.mockResolvedValue(null);

          const messages = new MessagesService(mockTriggers);
          const message = await messages.forgotPassword(
            "clientId",
            "userPoolId",
            user,
            "1234"
          );

          expect(message).toMatchObject({
            __code: "1234",
          });
        });
      });
    });

    describe("CustomMessage lambda is not configured", () => {
      it("returns just the code", async () => {
        mockTriggers.enabled.mockReturnValue(false);

        const messages = new MessagesService(mockTriggers);
        const message = await messages.forgotPassword(
          "clientId",
          "userPoolId",
          user,
          "1234"
        );

        expect(message).toMatchObject({
          __code: "1234",
        });
      });
    });
  });

  it.todo("signUp");
});
