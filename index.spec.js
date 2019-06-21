// import server, supertest, and db
const server = require('./api/server.js')
const request = require('supertest')
const db = require('./data/db')

// tests

beforeEach(async () => {
    await db('games').truncate();
});

describe("games db", () => {
  describe("GET /", () => {
    it("returns 200 OK", async () => {
      let res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
  describe("POST /games", () => {
    it("returns 201 with game", async () => {
      let res = await request(server)
        .post("/games")
        .send({
          title: "Cyberpunk 2077",
          genre: "RPG",
          releaseYear: 2020
        });
      expect(res.status).toBe(201);
    });
    it("returns 422 incomplete", async () => {
      let res = await request(server)
        .post("/games")
        .send({ title: "Deathstranding" });
      expect(res.status).toBe(422);
    });
    it("returns json format", async () => {
      let res = await request(server)
        .post("/games")
        .send({
          title: "Cyberpunk 2077",
          genre: "RPG",
          releaseYear: 2020
        });
      expect(res.type).toBe("application/json");
    });
  });
  describe("GET /games", () => {
    it("returns 200 OK", async () => {
      let res = await request(server).get("/games");
      expect(res.status).toBe(200);
    });
    it("returns empty array without game data", async () => {
      let res = await request(server).get("/games");
      expect(res.body).toEqual([]);
    });
    it("returns an array of games with data", async () => {
      await request(server)
        .post("/games")
        .send({
          title: "Cyberpunk 2077",
          genre: "RPG",
          releaseYear: 2020
        });
      let res = await request(server).get("/games");
      expect(res.body).toEqual([
        {
          id: 1,
          genre: "RPG",
          releaseYear: 2020,
          title: "Cyberpunk 2077"
        }
      ]);
    });
  });
});