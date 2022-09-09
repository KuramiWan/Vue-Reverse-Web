import { createServer } from "miragejs";

createServer({
  routes() {
    this.urlPrefix = "http://localhost:3000";
    this.post("/form", () => {
      return {
        movies: [
          { id: 1, name: "Inception", year: 2010 },
          { id: 2, name: "Interstellar", year: 2014 },
          { id: 3, name: "Dunkirk", year: 2017 }
        ]
      };
    });
  }
});
