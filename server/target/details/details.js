"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_fetch_1 = require("apollo-fetch");
const token = process.env.GITHUB_ACCESS_TOKEN;
exports.fetchLanguages = username => {
    const fetch = apollo_fetch_1.createApolloFetch({
        uri: "https://api.github.com/graphql"
    });
    fetch.use(({ options }, next) => {
        if (!options.headers) {
            options.headers = {};
        }
        options.headers["Authorization"] = `bearer ${token}`;
        next();
    });
    return fetch({
        query: `{
          user(login: "${username}") {
            name,
            repositories(first: 3) {
              edges {
                node {
                  name,
                  languages (first: 3) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `
    })
        .then(result => {
        const languages = result.data.user.repositories.edges.map(edge => {
            return edge.node.languages;
        });
        console.log('LANGUAGE', languages);
        const final = languages.map(obj => {
            console.log('THIS OBJECT', obj);
        });
        console.log('FINAL RESULT', final);
        return null;
    });
};
//# sourceMappingURL=details.js.map