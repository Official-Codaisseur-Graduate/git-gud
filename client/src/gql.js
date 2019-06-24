import gql from "graphql-tag";

// Demmy: this is the query part of the user object
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

// Option: harcode info to make the request to github
// which username, which repo
export const GET_TEST = gql`
  query GetSpecificRepo {
    repo {
      greet
    }
  }
`;
