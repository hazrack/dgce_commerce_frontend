import { mapGetters } from "vuex";

export default {
    data() {
        return {
            selectFluxDatas: [],
            formFields: [],
            loaderMessage: "Chargement...",
            filterMessage: "Pas de données disponibles pour les critères sélectionnés.",
            packTrade: this.getDefaultFilters(),
            filterByType: "both",
            filterByCountryCode: "",
            filterByProductId: "",
            filterByContinent: "",
            filterYear: null,
            listOfSelectProduct: [],
            tableData: [],
            tablefields: [
            ],

            tableFieldsGlobal: [
                { key: "year", label: "ANNÉE" },
                { key: "rank", label: "RANG GLOBAL" },
                { key: "countryLabel", label: "PAYS" },
                { key: "totalAmount", label: "ÉCHANGES BILATÉRAUX (CFA)" },
                { key: "balance", label: "BALANCE COMMERCIALE" },
                { key: "part", label: "PART / ÉCHANGES GLOBAUX (%)" },
                { key: "totalWeight", label: "QUANTITÉ GLOBALE (KG)" },
            ],

            tableFieldsImport: [
                { key: "year", label: "ANNÉE" },
                { key: "rank", label: "RANG FOURNISSEUR" },

                // { key: "supplierRank", label: "RANG FOURNISSEUR" },
                { key: "countryLabel", label: "PAYS" },
                { key: "importAmount", label: "VALEURS IMPORTATIONS (CFA)" },
                { key: "part", label: "PART / IMPORTATIONS GLOBALES (%)" },
                { key: "importWeight", label: "QUANTITÉ IMPORTÉE (TONNE)" },
            ],

            tableFieldsExport: [
                { key: "year", label: "ANNÉE" },
                { key: "rank", label: "RANG CLIENT" },
                // { key: "customerRank", label: "RANG CLIENT" },
                { key: "countryLabel", label: "PAYS" },
                { key: "exportAmount", label: "VALEURS EXPORTATIONS (CFA)" },
                { key: "part", label: "PART / EXPORTATIONS GLOBALES (%)" },
                { key: "exportWeight", label: "QUANTITÉ EXPORTÉE (TONNE)" },
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
                this.showSpinner = false;
                if (newValue && Array.isArray(newValue.datas) && newValue.datas.length > 0) {
                    this.initCountryTradeTableRanking();
                } else {
                    this.showSpinner = false;
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

        updateTableFields() {
            if (this.filterByType === "import") {
                this.tablefields = this.tableFieldsImport;
            } else if (this.filterByType === "export") {
                this.tablefields = this.tableFieldsExport;
            } else {
                this.tablefields = this.tableFieldsGlobal;
            }
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
            this.showSpinner = true;
            this.currentPage = page;
            this.fetchTradeRanking();
        },

        fetchTradeRanking() {
            this.loaderMessage = "Chargement et Calcul en Cours ..."
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
                    this.updateTableFields();

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

            // setTimeout(() => {
            //     this.showSpinner = false;
            // }, 500);
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

        this.updateTableFields();
        this.showSpinner = true;


        this.filterYear = new Date().getFullYear() - 1;
        this.initSelectFilter();

        setTimeout(() => {
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
        }, 1500);


    },
};
