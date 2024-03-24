const usersService = require("../users");
const jaccardContentFilter = require("../../rs/jaccardContentFilter");
const jaccardCollaborativeFilter = require("../../rs/jaccardCollaborativeFilter");
const jaccardTopologyFilter = require("../../rs/jaccardTopologyFilter");
const adamicAdarTopologyFilter = require("../../rs/adamicAdarTopologyFilter");
const cosineCollaborativeFilter = require("../../rs/cosineCollaborativeFilter");
const generalFilter = require("../../rs/generalFilter");
const getDataForJaccardCollaborative = require("./getDataForJaccardCollaborative");
const getDataForJaccardTopology = require("./getDataForJaccardTopology");
const getDataForJaccardContent = require("./getDataForJaccardContent");
const getDataForAdamicAdarTopology = require("./getDataForAdamicAdar");
const getDataForCosineCollaborative = require("./getDataForCosineCollaborative");
const getRecommendedIds = require("../../rs/getRecommendedIds");

const getRecommendedBySimilarities = async (similarities) => {
  const recommendedIds = getRecommendedIds(similarities);
  return await usersService.getRecommendedUsers(recommendedIds);
}

const performJaccardCollaborative = async (id) => {
  const data = await getDataForJaccardCollaborative(id);
  return jaccardCollaborativeFilter(data);
}

const performJaccardTopology = async (id) => {
  const data = await getDataForJaccardTopology(id);
  return jaccardTopologyFilter(data);
}

const performJaccardContent = async (id) => {
  const data = await getDataForJaccardContent(id);
  return jaccardContentFilter(data);
}

const performAdamicAdarTopology = async (id) => {
  const data = await getDataForAdamicAdarTopology(id);
  return adamicAdarTopologyFilter(data);
}

const performCosineCollaborative = async (id) => {
  const data = await getDataForCosineCollaborative(id);
  return cosineCollaborativeFilter(data);
}

const performFiltering = async (id, fn, name) => {
  const start = new Date();
  console.log(`${name} filter starting ${start.toISOString()}`);
  const similarities = await fn(id);
  const recommendedUsers = await getRecommendedBySimilarities(similarities);
  const end = new Date();
  console.log(`${name} filter finishing ${end.toISOString()}`);
  console.log(`Finished in ${((end.getTime() - start.getTime())/1000)} seconds`);
  return recommendedUsers;
}

module.exports = {
  jaccardContent: async (id) => {
    return await performFiltering(id, performJaccardContent, "Jaccard content");
  },

  jaccardCollaborative: async (id) => {
    return await performFiltering(id, performJaccardCollaborative, "Jaccard collaborative");
  },

  jaccardTopology: async (id) => {
    return await performFiltering(id, performJaccardTopology, "Jaccard topology");
  },

  adamicAdar: async (id) => {
    return await performFiltering(id, performAdamicAdarTopology, "Adamic-Adar topology");
  },

  cosineCollaborative: async (id) => {
    return await performFiltering(id, performCosineCollaborative, "Cosine collaborative");
  },

  general: async (id) => {
    const start = new Date();
    console.log(`General filter starting ${start.toISOString()}`);
    const results = await Promise.all([
      performJaccardContent(id),
      performJaccardCollaborative(id),
      performJaccardTopology(id)
    ]);
    const similarities = generalFilter(results);
    const recommendedUsers = await getRecommendedBySimilarities(similarities);
    const end = new Date();
    console.log(`General filter finishing ${end.toISOString()}`);
    console.log(`Finished in ${((end.getTime() - start.getTime())/1000)} seconds`);
    return recommendedUsers;
  }
};
