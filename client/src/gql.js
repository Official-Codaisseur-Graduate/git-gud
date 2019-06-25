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

// Newly added
export const GET_NEW_QUERY = gql`
  query {
    username {
      greet
    }
    repo {
      greet
    }
  }
`;
