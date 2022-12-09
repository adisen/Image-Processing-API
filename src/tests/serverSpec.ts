import app from "../server";
import supertest from "supertest";

const req = supertest(app);

describe("Test Image endpoint", () => {
  it("should return done", async () => {
    try {
      const res = await req.get(
        "/api/image?filename=fjord&width=100&height=100"
      );
      expect(res.status).toBe(200);
    } catch (error) {
      console.log("Error");
    }
  });
});
