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
    // console.log('THE RESULT', result.data.user.repositoriesContributedTo)

    // const totalCollaborations = result.data.user.repositoriesContributedTo.totalCount

    const collaborations = result.data.user.repositoriesContributedTo.edges.map(edge => {
      return {repoName: edge.node.name, owner: edge.node.owner.login}
    })

    // Finds the first 100 repos (considering there aren't more) and extracts the names into an array
    const repoNames = result.data.user.repositories.edges.map(edge => {
      return edge.node.name
     })

    // Renders an array of all languages used in the found repos
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


    let langCount = new Object()
    languages.map(language => {
      if (!langCount.hasOwnProperty(language)) {
        return langCount[language] = 1
      } else {
        return langCount[language]++
      }
    })

    // console.log(langCount)


    return { repoNames, languages, langCount, collaborations }
  })
}