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
            filterByOrganization: "",
            filterBySortBy: "totalAmount",
            filterYear: null,
            listOfSelectProduct: [],
            tableData: [],
            tablefields: [
            ],

            tableFieldsGlobal: [
                { key: "year", label: "ANNÉE" },
                { key: "rank", label: "RANG" },
                { key: "countryLabel", label: "PAYS" },
                { key: "totalAmount", label: "MONTANT TOTAL (MRD FCFA)" },
                { key: "totalWeight", label: "QUANTITÉ (TONNE)" },
                { key: "balance", label: "BALANCE COM ( MRD FCFA)" },
                { key: "part", label: "PART DANS LES ECHANGES (%)" },
                // { key: "supplierRank", label: "RANG FOURNISSEUR" },
                // { key: "customerRank", label: "RANG CLIENT" },

            ],

            tableFieldsBalanceGlobal: [
                { key: "year", label: "ANNÉE" },
                { key: "balanceRank", label: "RANG" },
                { key: "countryLabel", label: "PAYS" },
                { key: "totalAmount", label: "MONTANT TOTAL (MRD FCFA)" },
                { key: "totalWeight", label: "QUANTITÉ (TONNE)" },
                { key: "balance", label: "BALANCE COM ( MRD FCFA)" },
                { key: "part", label: "PART DANS LES ECHANGES (%)" }

            ],

            tableFieldsImport: [
                { key: "year", label: "ANNÉE" },
                { key: "rank", label: "RANG FOURNISSEUR" },

                { key: "countryLabel", label: "PAYS" },
                { key: "importAmount", label: "VALEURS (milliard FCFA)" },
                { key: "importWeight", label: "QUANTITÉ (TONNE)" },
                { key: "part", label: "PART DANS LES IMPORTATIONS  (%)" },
            ],

            tableFieldsExport: [
                { key: "year", label: "ANNÉE" },
                { key: "rank", label: "RANG CLIENT" },
                { key: "countryLabel", label: "PAYS" },
                { key: "exportAmount", label: "VALEURS (milliard FCFA)" },
                { key: "exportWeight", label: "QUANTITÉ (TONNE)" },
                { key: "part", label: "PART DANS LES EXPORTATIONS (%)" },
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
            "retcontinentSelect",
            "retcontinentsRawData",
            "retorgaSelectData",
            "retlistOfOrganization"
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
            } else if (this.filterBySortBy === "balance") {
                this.tablefields = this.tableFieldsBalanceGlobal;
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
                continentId: this.filterByContinent,
                organizationId: this.filterByOrganization,
                sortBy: this.filterBySortBy
            });
        },

        handleFieldFluxChange({ fieldName, value }) {
            this.showSpinner = true;

            console.log('le type clické', fieldName);
            console.log('la valeur ', value);

            //value = 0 => LE CLICK SUR ( Tous les continents, pays, produit )
            if (value == 0) {
                //on passe la value a null afin de sortir du filtre vers le backend au niveau du fetchTradeRanking
                //si la value est different de 0 alors on filtre avec la valeur
                value = null;
            }


            switch (fieldName) {
                case "choosedYear":
                    this.filterYear = value;
                    break;
                case "choosedTrade":
                    this.filterByType = value;
                    this.updateTableFields();
                    // Le tri par balance n'a de sens que pour le type "both" (voir backend)
                    if (this.filterByType !== "both") {
                        this.filterBySortBy = "totalAmount";
                    }
                    // Le select "Trier par" n'a lui-même de sens que pour le type "both"
                    this.initSelectFilter();

                    break;
                case "checkByCountry":
                    this.filterByCountryCode = value;
                    break;
                case "productSelected":
                    this.filterByProductId = value;
                    break;
                case "continentSelected":
                    this.filterByContinent = value;
                    // Le pays précédemment sélectionné peut ne plus appartenir à ce continent :
                    // on réinitialise le filtre ET on force le select visuel "Pays" sur
                    // "Tous les pays" via une nouvelle référence de packTrade.
                    this.filterByCountryCode = "";
                    this.packTrade = { ...this.packTrade, checkByCountry: "0" };
                    this.initSelectFilter();
                    break;
                case "organizationSelected":
                    this.filterByOrganization = value;
                    // Le pays précédemment sélectionné peut ne plus appartenir à cette C.E.R :
                    // on réinitialise le filtre ET on force le select visuel "Pays" sur
                    // "Tous les pays" via une nouvelle référence de packTrade.
                    this.filterByCountryCode = "";
                    this.packTrade = { ...this.packTrade, checkByCountry: "0" };
                    this.initSelectFilter();
                    break;
                case "sortBySelected":
                    this.filterBySortBy = value || "totalAmount";
                    this.updateTableFields();
                    break;

            }

            this.currentPage = 0;
            this.fetchTradeRanking();

        },



        initSelectFilter() {
            let countriesDatas = [...this.retcountryByAlphaCode2Select];

            // Si un continent précis est sélectionné, ne garder que ses pays
            if (this.filterByContinent) {
                const selectedContinent = this.retcontinentsRawData.find(
                    (continent) => continent.id === this.filterByContinent
                );
                if (selectedContinent) {
                    const alphaCodesOfContinent = new Set(selectedContinent.countryAlphaCodes);
                    countriesDatas = countriesDatas.filter((country) =>
                        alphaCodesOfContinent.has(country.value)
                    );
                }
            }

            // Si une C.E.R précise est sélectionnée, ne garder que ses pays membres
            if (this.filterByOrganization) {
                const selectedOrganization = this.retlistOfOrganization.find(
                    (organization) => organization.id === this.filterByOrganization
                );
                if (selectedOrganization) {
                    const alphaCodesOfOrganization = new Set(
                        (selectedOrganization.countries || []).map((c) => c.alphaCode2)
                    );
                    countriesDatas = countriesDatas.filter((country) =>
                        alphaCodesOfOrganization.has(country.value)
                    );
                }
            }

            const countriesWithAll = [
                { label: "Tous les pays", value: "0" },
                ...countriesDatas
            ];

            const continentDatas = [...this.retcontinentSelect];
            const continentWithAll = [
                { label: "Tous les continents", value: "0" },
                ...continentDatas
            ];

            const organizationDatas = [...this.retorgaSelectData];
            const organizationWithAll = [
                { label: "Toutes les C.E.R", value: "0" },
                ...organizationDatas
            ];

            const productDatas = [...this.listOfSelectProduct];
            const productWithAll = [
                { label: "Tous les produits", value: "0" },
                ...productDatas
            ];

            this.selectFluxDatas = [
                {
                    label: "Année",
                    type: "select",
                    model: "choosedYear",
                    required: true,
                    options: this.retlistOfYearBetw95ToNow,
                    enableSearch: true,

                },
                {
                    label: "Type de flux",
                    type: "select",
                    model: "choosedTrade",
                    required: true,
                    options: [
                        { value: "both", label: "Global" },
                        { value: "import", label: "Importation" },
                        { value: "export", label: "Exportation" },
                    ],
                    enableSearch: true,

                },
                ...(this.filterByType === "both" ? [{
                    label: "Trier par",
                    type: "select",
                    model: "sortBySelected",
                    required: true,
                    options: [
                        { value: "totalAmount", label: "Montant total" },
                        { value: "balance", label: "Balance commerciale" },
                    ],
                    enableSearch: true,

                }] : []),
                {
                    label: "Continent",
                    type: "select",
                    model: "continentSelected",
                    required: true,
                    options: continentWithAll,
                    enableSearch: true,

                },
                {
                    label: "C.E.R",
                    type: "select",
                    model: "organizationSelected",
                    required: true,
                    options: organizationWithAll,
                    enableSearch: true,

                },
                {
                    label: "Pays",
                    type: "select",
                    model: "checkByCountry",
                    required: true,
                    options: countriesWithAll,
                    enableSearch: true, // Active la fonctionnalité de recherche
                },
                {
                    label: "Produit",
                    type: "select",
                    model: "productSelected",
                    required: true,
                    options: productWithAll,
                    enableSearch: true,
                },
            ];
        }
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
                this.$store.dispatch("getListOfOrganization"),
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
