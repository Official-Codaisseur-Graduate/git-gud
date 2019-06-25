import { createApolloFetch } from "apollo-fetch";

const token = process.env.GITHUB_ACCESS_TOKEN;

export const fetchLanguages = username => {
  console.log("username", username);
  const fetch = createApolloFetch({
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
            repositories(first: 50) {
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
    const repoNames = result.data.user.repositories.edges.map(edge => {
      return edge.node.name
     })

    const languages = result.data.user.repositories.edges.map(edge => {
      // const repoName = edge.node.name
      const languagePerRepo = edge.node.languages.edges.map(edge => {
        if (edge.node.length < 1) {
          return 'Not identified'
        }
        return edge.node.name
      })
      return languagePerRepo
    }).flat()

    // I added in the repoNames first, but that wasn't very convenient,
    // so I separated them in case we would need them later

    return { repoNames, languages }
  })
}