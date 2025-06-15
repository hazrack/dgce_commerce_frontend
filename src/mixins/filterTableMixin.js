import { mapGetters } from "vuex";

export default {
    data() {
        return {
            selectFluxDatas: [],
            formFields: [],
            filterMessage: "Pas de données disponibles pour les critères sélectionnés.",
            packTrade: this.getDefaultFilters(),
            filterByType: "both",
            filterByCountryCode: "",
            filterByProductId: "",
            filterByContinent:"",
            filterYear: null,
            listOfSelectProduct: [],
            tableData: [],
            tablefields: [
                { key: "year", label: "ANNÉE" },
                { key: "rank", label: "Rang Global" },
                { key: "countryLabel", label: "Pays" },
                { key: "totalAmount", label: "E. Billatéraux (Fcfa)" },
                { key: "exportAmount", label: "Montant Export (Fcfa)" },
                { key: "importAmount", label: "Montant Import (Fcfa)" },
                { key: "balance", label: "Balance Commerciale" },
                { key: "part", label: "Part Globaux (%)" },
                { key: "importWeight", label: "Poids Import (Kg)" },
                { key: "exportWeight", label: "Poids Export (Kg)" },
                { key: "totalWeight", label: "Poids Global (Kg)" },
                { key: "customerRank", label: "Rang Client" },
                { key: "supplierRank", label: "Rang Fournisseur" },
            ],
            currentPage: 0,
            totalPages: 1,
            maxVisiblePages: 5,
            showSpinner: false,
        };
    },

    computed: {
        ...mapGetters([
            "retcountryByAlphaCode2Select",
            "retlistOfYearBetw95ToNow",
            "retcountryTradeRankings",
            "retlistOfProducts",
            "retcontinentSelect"
        ]),
    },

    watch: {
        retcountryTradeRankings: {
            immediate: true,
            handler(newValue) {
                if (newValue && Array.isArray(newValue.datas) && newValue.datas.length > 0) {
                    this.initCountryTradeTableRanking();
                } else {
                    this.tableData = [];
                }
            },
        },

        retlistOfProducts: {
            immediate: true,
            handler(newValue) {
                if (newValue && Array.isArray(newValue.datas) && newValue.datas.length > 0) {
                    this.addMoreProductInSelectArray();
                } else {
                    this.listOfSelectProduct = [];
                    this.initSelectFilter();
                    this.showSpinner = false;

                }
            },
        },
    },

    methods: {
        getDefaultFilters() {
            return {
                choosedYear: new Date().getFullYear() - 1,
                choosedTrade: "both",
            };
        },

        performSearch(query) {
            this.showSpinner = true;

            if (query.length >= 2) {
                this.$store.dispatch("SearchListOfProduct", { value: query });
            }

            if (query.length == 0) {
                this.$store.dispatch("getListOfProducts", { page: 0, size: 16 });
            }

        },

        addMoreProductInSelectArray() {
            console.log("Il ya un chagment");

            const nouveauxProduits = this.retlistOfProducts.datas.map((p) => ({
                value: p.id,
                label: p.labelProduct,
            }));
            this.showSpinner = false;
            this.listOfSelectProduct = nouveauxProduits;
            this.initSelectFilter();
        },

        initCountryTradeTableRanking() {
            this.currentPage = this.retcountryTradeRankings.currentPage;
            this.totalPages = this.retcountryTradeRankings.totalPages;
            this.tableData = this.retcountryTradeRankings.datas;
        },

        checkToPage(page) {
            this.currentPage = page;
            this.fetchTradeRanking();
        },

        fetchTradeRanking() {
            this.$store.dispatch("getTradeFlowCountryRanking", {
                year: this.filterYear,
                page: this.currentPage,
                size: 12,
                type: this.filterByType,
                countryCode2: this.filterByCountryCode,
                productId: this.filterByProductId,
                continentId: this.filterByContinent
            });
        },

        handleFieldFluxChange({ fieldName, value }) {
            this.showSpinner = true;

            console.log('le type ', fieldName);
            console.log('la valeur ', value);
            

            switch (fieldName) {
                case "choosedYear":
                    this.filterYear = value;
                    break;
                case "choosedTrade":
                    this.filterByType = value;
                    break;
                case "checkByCountry":
                    this.filterByCountryCode = value;
                    break;
                case "productSelected":
                    this.filterByProductId = value;
                    break;
                case "continentSelected":
                    this.filterByContinent = value;
                    break;
                    
            }

            this.currentPage = 0;
            this.fetchTradeRanking();

            setTimeout(() => {
                this.showSpinner = false;
            }, 500);
        },

        initSelectFilter() {
            this.selectFluxDatas = [
                {
                    label: "Année",
                    type: "select",
                    model: "choosedYear",
                    required: true,
                    options: this.retlistOfYearBetw95ToNow,
                },
                {
                    label: "Type échanges",
                    type: "select",
                    model: "choosedTrade",
                    required: true,
                    options: [
                        { value: "both", label: "Global" },
                        { value: "import", label: "Importation" },
                        { value: "export", label: "Exportation" },
                    ],
                },
                {
                    label: "Continent",
                    type: "select",
                    model: "continentSelected",
                    required: true,
                    options: this.retcontinentSelect
                },
                {
                    label: "Pays",
                    type: "select",
                    model: "checkByCountry",
                    required: true,
                    options: this.retcountryByAlphaCode2Select,
                },
                {
                    label: "Produit",
                    type: "select",
                    model: "productSelected",
                    required: true,
                    options: this.listOfSelectProduct,
                },
            ];
        },
    },

    mounted() {
        console.log("le sencde moutend");

        this.showSpinner = true;
        this.filterYear = new Date().getFullYear() - 1;
        this.initSelectFilter();

        Promise.all([
            this.$store.dispatch("getListOfCountries"),
            this.$store.dispatch("getListOfContinents"),
            this.$store.dispatch("getListOfProducts", { page: 0, size: 16 }),
            this.$store.dispatch("getTradeFlowCountryRanking", {
                year: this.filterYear,
                page: 0,
                size: 12,
            }),
        ]).then(() => {
            setTimeout(() => {
                this.showSpinner = false;
            }, 100);
        });
    },
};
