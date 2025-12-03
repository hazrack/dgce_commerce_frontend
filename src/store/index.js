import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from '../services/index.js';
import _ from 'lodash';

export const store = createStore({
   plugins: [createPersistedState()],
   state: {
      userLogStatus: false,
      logedUser: null,
      listOfUsers: null,
      listOfOmcs: null,
      listOfProducts: null,
      listOfCountries: null,
      listOfSimpleCountryLabel: null,
      listOfYearBetw95ToNow: null,
      listOfOrganization: null,
      countrySelectData: null,
      orgaSelectData: null,
      listOfAgreement: null,
      filterCountryOrOrgaAgreem: null,
      agreemBilatMapSelect: null,
      agreemBilatMapData: null,
      agreemRegionalMapSelect: null,
      agreemRegionalMapData: null,
      globalStats: null,
      productRankings: null,
      countryByAlphaCode2Select: null,
      countryTradeRankings: null,
      continentSelect: null,
      statsSeriesHistory: null,
      cooperationList: null
   },
   mutations: {
      MutLogedUser(state, payload) {
         state.logedUser = payload;
      },
      mutLogin(state, payload) {
         state.userLogStatus = payload;
         window.location.reload();
      },
      MutGlobalListOfUsers(state, payload) {
         state.listOfUsers = payload;
      },
      MutGlobalListOfOmcs(state, payload) {
         state.listOfOmcs = payload;
      },
      MutGlobalListOfProducts(state, payload) {
         state.listOfProducts = payload;
      },
      MutGlobalCountries(state, payload) {
         state.listOfCountries = payload;
      },
      MutSimpleCountryLabel(state, payload) {
         state.listOfSimpleCountryLabel = payload;
      },
      MutListOfYearBetw95ToNow(state, payload) {
         state.listOfYearBetw95ToNow = payload;
      },
      MutGlobalOrganization(state, payload) {
         state.listOfOrganization = payload;
      },
      MutCountrySelectData(state, payload) {
         state.countrySelectData = payload;
      },
      MutCountryByAlphaCode2Select(state, payload) {
         state.countryByAlphaCode2Select = payload;
      },
      MutOrgaSelectData(state, payload) {
         state.orgaSelectData = payload;
      },
      MutGlobalAgreement(state, payload) {
         state.listOfAgreement = payload;
      },
      MutCountryOrOrgaAgreement(state, payload) {
         state.filterCountryOrOrgaAgreem = payload;
      },
      MutAgreemBilatMapSelect(state, payload) {
         state.agreemBilatMapSelect = payload;
      },
      MutAgreemBilatMapData(state, payload) {
         state.agreemBilatMapData = payload;
      },
      MutAgreemRegionalMapSelect(state, payload) {
         state.agreemRegionalMapSelect = payload;
      },
      MutAgreemRegionalMapData(state, payload) {
         state.agreemRegionalMapData = payload;
      },
      MutGlobalStats(state, payload) {
         state.globalStats = payload;
      },
      MutListOfProductRanking(state, payload) {
         state.productRankings = payload;
      },
      MutTradeCountryRanking(state, payload) {
         state.countryTradeRankings = payload;
      },
      MutContinentSelect(state, payload) {
         state.continentSelect = payload;
      },
      MutStatsSeriesHistory(state, payload) {
         state.statsSeriesHistory = payload;
      },

      MutListCooperation(state, payload) {
         state.cooperationList = payload;
      },
   },
   actions: {

      getListOfUsers({ commit }, { page, size }) {
         axios.get(`/users?page=${page}&size=${size}`)
            .then((response) => {

               commit("MutGlobalListOfUsers", response.data);

            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getListOfCountries({ commit }) {
         axios.get(`/countries`)
            .then((response) => {

               const simpleOmcCountryLabel = response.data.map(item => {
                  return {
                     label: item.label,
                     value: item.label
                  };
               });

               const countrySelectIdData = response.data.map(item => {
                  return {
                     label: item.label,
                     value: item.id
                  };
               });


               const countryByAlpha2Select = response.data
                  .map(item => ({
                     label: item.label,
                     value: item.alphaCode2
                  }))
                  .sort((a, b) => a.label.localeCompare(b.label));

               console.log("OK ICI OK OKS", countryByAlpha2Select);



               const currentYear = new Date().getFullYear();
               const startYear = 1995;

               const yearFor95ToNow = Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
                  const year = currentYear - i;
                  return { value: String(year), label: String(year) };
               });


               //LISTE DES ANNEES 1995 - AUJOURDHUI
               commit("MutListOfYearBetw95ToNow", yearFor95ToNow);

               //DESTINEE AU CHAMP SELECT POUR AJOUT PAYS
               commit("MutCountrySelectData", countrySelectIdData);

               //DESTINE A LA RECHERCHE AU NIVEAU DES ECHANGE ET PRODUIT RANKING

               commit("MutCountryByAlphaCode2Select", countryByAlpha2Select);

               //INPUT LABEL FOR OMC ADD FORM
               commit("MutSimpleCountryLabel", simpleOmcCountryLabel);

               //NORMAL LIST OF COUNTRY WITH GLOBAL INFOS
               commit("MutGlobalCountries", response.data);

            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getListOfOmc({ commit }, { page, size }) {
         axios.get(`/omcs?page=${page}&size=${size}`)
            .then((response) => {
               commit("MutGlobalListOfOmcs", response.data);
            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },


      SearchListOfOmc({ commit }, { value }) {
         axios.get(`/omcs/search?q=${value}`)
            .then((response) => {
               commit("MutGlobalListOfOmcs", response.data);
            })
            .catch((error) => {
               if (error.response.status == 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getListOfProducts({ commit }, { page, size }) {
         axios.get(`/products?page=${page}&size=${size}`)
            .then((response) => {
               commit("MutGlobalListOfProducts", response.data);
            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      SearchListOfProduct({ commit }, { value }) {
         axios.get(`/products/search?q=${value}`)
            .then((response) => {
               commit("MutGlobalListOfProducts", response.data);
            })
            .catch((error) => {
               if (error.response.status == 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getTradeFlowProductRanking({ commit }, { year, page = 0, size = 12, type = "both", countryCode2 = "", productId = "" }) {
         return axios.get(`/trade-flow/products/rankings`, {
            params: {
               year,
               page,
               size,
               type,
               countryCode: countryCode2 || null,
               productId: productId || null,
            }
         })
            .then((response) => {

               commit("MutListOfProductRanking", response.data);

            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getTradeFlowCountryRanking({ commit }, { year, page = 0, size = 12, type = "both", countryCode2 = "", productId = "", continentId = "" }) {
         return axios.get(`/trade-flow/countries/rankings`, {
            params: {
               year,
               page,
               size,
               type,
               countryCode: countryCode2 || null,
               productId: productId || null,
               continentId: continentId || null
            }
         })
            .then((response) => {

               commit("MutTradeCountryRanking", response.data);

            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getListOfOrganization({ commit }) {
         axios.get(`/organizations`)
            .then((response) => {

               const orgaSelectIdData = response.data.map(item => ({
                  label: item.label,
                  value: item.id
               }))
                  .sort((a, b) => a.label.localeCompare(b.label));



               commit("MutOrgaSelectData", orgaSelectIdData);


               commit("MutGlobalOrganization", response.data);
            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getListOfContinents({ commit }) {
         axios.get(`/continents`)
            .then((response) => {

               const contientSelect = response.data
                  .map(item => ({
                     label: item.label,
                     value: item.id
                  }))
                  .sort((a, b) => a.label.localeCompare(b.label));

               commit("MutContinentSelect", contientSelect);


               // commit("MutContinentData", response.data);
            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getListOfCooperation({ commit }, { page, size }) {
         axios.get(`/cooperations?page=${page}&size=${size}`)
            .then((response) => {

               commit("MutListCooperation", response.data);
            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },
      SearchCooperations({ commit }, { value }) {
         axios.get(`/cooperations/search?q=${value}`)
            .then((response) => {
               commit("MutListCooperation", response.data);
            })
            .catch((error) => {
               if (error.response.status == 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },


      getListOfAgreement({ commit }, { page, size }) {
         axios.get(`/agreements?page=${page}&size=${size}`)
            .then((response) => {

               commit("MutGlobalAgreement", response.data);
            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      SearchAgreements({ commit }, { query, page = 0, size = 18 }) {
         axios.get(`/agreements/search?q=${query}&page=${page}&size=${size}`)
            .then((response) => {
               commit("MutGlobalAgreement", response.data);
            })
            .catch((error) => {
               if (error.response.status == 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getAgreementsByCountryIdOrOrgaId({ commit }, { orgaId, countryId }) {
         let url = "";
         if (orgaId == null) {
            url = `/agreements?countryId=${countryId}`
         } else if (countryId == null) {
            url = `/agreements?organizationId=${orgaId}`
         }
         axios.get(url)
            .then((response) => {
               commit("MutCountryOrOrgaAgreement", response.data);
            })
            .catch((error) => {
               if (error.response.status == 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getBilateralSignedCountries({ commit }) {
         axios.get(`/agreements/signed-countries`)
            .then((response) => {


               const mapCountrySelect = response.data.map(item => ({
                  label: item.label,
                  value: item.id
               }))
                  .sort((a, b) => a.label.localeCompare(b.label));


               //SELECT LIST PAYS AYANT UN ACCORD BILATERAL
               commit("MutAgreemBilatMapSelect", mapCountrySelect);

               //NORMAL LIST OF COUNTRY WITH GLOBAL INFOS
               commit("MutAgreemBilatMapData", response.data);

            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getAgreementSignedOrga({ commit }) {
         axios.get(`/agreements/signed-organizations`)
            .then((response) => {


               const mapOrganizationSelect = response.data.map(item => {
                  return {
                     label: item.label,
                     value: item.id
                  };
               });

               //SELECT LIST PAYS AYANT UN ACCORD BILATERAL
               commit("MutAgreemRegionalMapSelect", mapOrganizationSelect);

               //NORMAL LIST OF COUNTRY WITH GLOBAL INFOS
               commit("MutAgreemRegionalMapData", response.data);

            })
            .catch((error) => {
               if (error.response && error.response.status === 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getGlobalStats({ commit }) {
         axios.get(`/stats/global`)
            .then((response) => {
               commit("MutGlobalStats", response.data);
            })
            .catch((error) => {
               if (error.response.status == 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      checkValidateToken({ commit }) {
         axios.get(`/users/validate-token`)
            .then((response) => {
               console.log('====================================');
               console.log("intercept token", response);
               console.log('====================================');
            })
            .catch((error) => {
               if (error.response.status == 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },

      getStatsSeriesHistory({ commit }) {
         axios.get(`/stats/continent/series`)
            .then((response) => {
               // Retourne une liste d'objets contenant le label du continent avec le type d'échange (Importation ou Exportation)
               // Pour les statistique Barchat

               commit("MutStatsSeriesHistory", response.data);
            })
            .catch((error) => {
               if (error.response.status == 401) {
                  commit("mutLogin", false);
                  localStorage.clear();
               }
            });
      },



   },
   getters: {
      retLogUser(state) {
         return state.logedUser || [];
      },
      retadminUser(state) {
         return state.adminUser || 0;
      },
      retlistOfUsers(state) {
         return state.listOfUsers || [];
      },
      retlistOfOmcs(state) {
         return state.listOfOmcs || [];
      },
      retlistOfProducts(state) {
         return state.listOfProducts || [];
      },
      retlistOfCountries(state) {
         return state.listOfCountries || [];
      },
      retlistOfSimpleCountryLabel(state) {
         return state.listOfSimpleCountryLabel || [];
      },
      retlistOfYearBetw95ToNow(state) {
         return state.listOfYearBetw95ToNow || [];
      },
      retlistOfOrganization(state) {
         return state.listOfOrganization || [];
      },
      retcountrySelectData(state) {
         return state.countrySelectData || [];
      },
      retorgaSelectData(state) {
         return state.orgaSelectData || [];
      },
      retlistOfAgreement(state) {
         return state.listOfAgreement || [];
      },
      retAgrementByCountryIdOrOrgaId(state) {
         return state.filterCountryOrOrgaAgreem || [];
      },
      retagreemBilatMapSelect(state) {
         return state.agreemBilatMapSelect || [];
      },
      retagreemBilatMapData(state) {
         return state.agreemBilatMapData || [];
      },
      retagreemRegionalMapSelect(state) {
         return state.agreemRegionalMapSelect || [];
      },
      retagreemRegionalMapData(state) {
         return state.agreemRegionalMapData || [];
      },
      retglobalStats(state) {
         return state.globalStats || [];
      },
      retproductRankings(state) {
         return state.productRankings || [];
      },
      retcountryByAlphaCode2Select(state) {
         return state.countryByAlphaCode2Select || [];
      },
      retcountryTradeRankings(state) {
         return state.countryTradeRankings || [];
      },
      retcontinentSelect(state) {
         return state.continentSelect || [];
      },
      retstatsSeriesHistory(state) {
         return state.statsSeriesHistory || [];
      },
      retcooperationList(state) {
         return state.cooperationList || [];
      },
   }
});
