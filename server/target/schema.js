"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const typeorm_1 = require("typeorm");
const repoDetails_1 = require("./data/repoDetails");
const profileScore_1 = require("./data/profileScore");
const gitUse_1 = require("./data/gitUse");
const entity_1 = require("./score/entity");
const typeDefs = `

  type Query {
    user(username: String): User
    repo: Repo
  }

  type Repo {
    greet: String
  }

  type User {
    username: String
    score: Int
    profileScore: Int
    averageRepoScore: Int
    repoScore: Int
    profileStats: Profile
    stats: Stats
    previousScores: [History]
  }

  type History {
    id: Int
    userName: String
    profileScore: Int
    gitScore: Int
    createdAt: String
  }

  type Profile {
    bio: Boolean
    email: Boolean
    isHireable: Boolean
    location: Boolean
    name: Boolean
    websiteUrl: Boolean
    pinnedRepositories: Boolean
    picture: Boolean
  }

  type Stats {
    totalPinnedRepos: Int
    averageBranchPerRepo: Int
    averageCommitPerBranch: Int
    repoNames: [Repository]
  }

  type Repository {
    name: String
    owner: String
    commitScore: Commit
    branchScore: Branch
    totalRepoScore: Int
    repoReadMe: Int
    gitIgnoreScore: Int
    description: Boolean 
  }

  type Commit {
    lengthExceeds: Int
    containsAND: Int
    containsPeriod: Int
    upperCase: Int
    totalScore: Int
  }

  type Branch {
    hasThreeBranches: Int
    hasMasterBranch: Int
    hasDevelopmentBranch: Int
    hasFeatBranch: Int
    useDescriptiveNames: Int
    totalScore: Int
}

`;
const resolvers = {
    Query: {
        user: async (_, { username }, __, ___) => {
            const data = await profileScore_1.analizeProfile(username);
            const gitUse = await gitUse_1.fetchGeneralData(username);
            data.stats = gitUse;
            console.log("Demmy: data stats: ", data.stats);
            let averageRepoScore = 0;
            let lastScore;
            const userScores = await entity_1.Score.find({ userName: username });
            if (userScores.length > 0) {
                data.previousScores = userScores;
                lastScore = userScores[userScores.length - 1];
            }
            else {
                lastScore = null;
            }
            const score = new entity_1.Score();
            score.profileScore = data.score;
            score.gitScore = 0;
            score.userName = username;
            if (data.stats.totalPinnedRepos > 0) {
                const promises = data.stats.repoNames.map(async (repo, i) => {
                    const TEST = await repoDetails_1.fetchRepoData(repo.owner, repo.name).then(repoData => {
                        if (!repoData)
                            throw new Error();
                        console.log("Demmy: repo data: ", repoData);
                        averageRepoScore += repoData.totalRepoScore;
                        data.stats.repoNames[i] = Object.assign({}, data.stats.repoNames[i], { commitScore: Object.assign({}, repoData.commitScore), branchScore: Object.assign({}, repoData.branchScore), amountOfBranches: Object.assign({}, repoData.branchCount), description: repoData.description, gitIgnoreScore: repoData.gitIgnoreScore, repoReadMe: repoData.repoReadMe, totalRepoScore: repoData.totalRepoScore });
                    });
                    return TEST;
                });
                return Promise.all(promises).then(() => {
                    data.profileScore = data.score;
                    data.averageRepoScore = Math.round(averageRepoScore / data.stats.repoNames.length);
                    data.repoScore = Math.round(data.averageRepoScore / 2);
                    data.score += data.repoScore;
                    data.score = Math.round(data.score);
                    score.gitScore = data.repoScore;
                    saveScoreIfUpdated(score, lastScore);
                    console.log("Demmy: console log final data: ", data);
                    return data;
                });
            }
            saveScoreIfUpdated(score, lastScore);
            data.profileScore = data.score;
            data.repoScore = 0;
            return data;
        },
        repo: async () => {
            return {
                greet: 'Hallo jongens!'
            };
        }
    },
};
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers
});
const saveScoreIfUpdated = (score, lastScore) => {
    if (!lastScore) {
        typeorm_1.getRepository(entity_1.Score).save(score);
    }
    else {
        const newScore = score.gitScore + score.profileScore;
        const oldScoreValue = lastScore.gitScore + lastScore.profileScore;
        if (new Date().toLocaleDateString() ===
            lastScore.createdAt.toLocaleDateString() &&
            newScore === oldScoreValue) {
            return;
        }
        typeorm_1.getRepository(entity_1.Score).save(score);
    }
};
exports.default = schema;
//# sourceMappingURL=schema.js.map