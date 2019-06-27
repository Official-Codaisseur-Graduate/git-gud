import { createApolloFetch } from "apollo-fetch";

const token = process.env.GITHUB_ACCESS_TOKEN;

export const fetchLanguages = username => {
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
    /* 
    Newly added: 
    We are querying below our own repositories,
    and the ones we contributed to. 
    
    About contributed repositories:
    - Login is simply requesting the username of the person's repo you are contributing to (string).

    About own repositories:
    - Here we are requesting all the programming languages used in each repo.
    */
    query: `{
          user(login: "${username}") {
            name,
            repositoriesContributedTo(first: 100) {
              totalCount,
              edges {
                node {
                  name,
                  owner {
                    login
                  }
                }
              }
            }
            repositories(first: 100) {
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
      /* 
      Newly added: below we receive the results of the above query.
      Log this result as follows: console.log('Whole query result', result.data)
      */

      // Newly added: mapping all the repo's you contributed to and returning name and owner of repo.
      const collaborations = result.data.user.repositoriesContributedTo.edges.map(edge => {
        return { repoName: edge.node.name, owner: edge.node.owner.login }
      })

      // Newly added: here we are mapping all of names of your own repo's.
      const repoNames = result.data.user.repositories.edges.map(edge => {
        return edge.node.name
      })

      // Newly added: renders an array of all languages used in your own repos
      const languages = result.data.user.repositories.edges.map(edge => {
        const languagePerRepo = edge.node.languages.edges.map(edge => {
          if (edge.node.length < 1) {
            return 'Not identified'
          }
          return edge.node.name
        })
        return languagePerRepo
      }).flat()

      // Newly added: here we are creating an empty object and counting the frequency of the used languages.
      let langCount = new Object()
      languages.map(language => {
        if (!langCount.hasOwnProperty(language)) {
          return langCount[language] = 1
        } else {
          return langCount[language]++
        }
      })

      // Newly added: returning all the above function results to the resolver in schema.ts
      return { repoNames, languages, langCount, collaborations }
    })
}