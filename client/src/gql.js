import gql from "graphql-tag";

export const GET_USER_DATA = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      username
      score
      averageRepoScore
      profileScore
      repoScore
      previousScores {
        profileScore
        gitScore
        createdAt
      }
      profileStats {
        bio
        email
        isHireable
        location
        name
        websiteUrl
        pinnedRepositories
        picture
      }
      stats {
        totalPinnedRepos
        averageBranchPerRepo
        averageCommitPerBranch
        repoNames {
          name
          owner
          totalRepoScore
          repoReadMe
          gitIgnoreScore
          description
          commitScore {
            lengthExceeds
            containsAND
            containsPeriod
            upperCase
            totalScore
          }
          branchScore {
            hasThreeBranches
            hasMasterBranch
            hasDevelopmentBranch
            hasFeatBranch
            useDescriptiveNames
            totalScore
          }
        }
      }
    }
  }
`;

/* 
Newly added: below we are requesting information from the server (see resolver schema.ts).
Below's query matches the object we returned on server side at the resolver.
the GET_TEST query is being made in App.js (basically on page load).
*/
export const GET_TEST = gql`
  query GetSpecificRepo($username: String!) {
    repo(username: $username) {
      repos
      languages
      collaborations {
        repoName
        owner
      }
      langCount {
        language
      }
    }
  }
`;
