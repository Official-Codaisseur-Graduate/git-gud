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
    // console.log('HERE IS THE RESULT', result.data.user.repositories.edges)
    const languages = result.data.user.repositories.edges.map(edge => {
      return edge.node.languages
    })
    console.log('LANGUAGE', languages)
    
    const final = languages.map(obj => {
      console.log('THIS OBJECT', obj)
      
      // const languagesPerRepo = obj.edges.map(obj => {
      //   console.log('NODE????', obj.node.name)
        
      //   return obj.node.name
      // })
    })
    console.log('FINAL RESULT', final)
    return null
  })
}