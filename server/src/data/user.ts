import { createApolloFetch } from "apollo-fetch";

const token = process.env.GITHUB_ACCESS_TOKEN;

export const fetchUser = (username: string): any => {
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
                name
                repositories(first: 25) {
                    nodes {
                        name
                        primaryLanguage {
                            name
                            }
                        }
                    }
                } 
            }`
    })
        .then(res => {
            const user = res.data.user;
            return user;
        })
        .catch(e => e);
};
