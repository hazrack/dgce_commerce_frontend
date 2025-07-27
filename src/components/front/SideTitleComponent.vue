<template>
    <div class="block-of-details-title">
      <div
        class="princpal-side-title"
        @click="handleClick(item, index + 1)"
        v-for="(item, index) in items"
        :key="item.id"
        :class="{ active: index + 1 === activeId }"
      >
        <p>
          {{ item.title }}
          <span class="icon-arrow">
            <i class="bi bi-arrow-right"></i>
          </span>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SideTitle',
    data(){
        return {
            activeId: 1,
        }
    },
    props: {
      items: {
        type: Array,
        required: true,
        default: () => []
      },
    },
    methods: {
      handleClick(item, key) {
        console.log("LA KEY DANS LE COMPOSANT " , key);

        this.activeId = key;

        this.$emit('item-selected', { item, key })
      }
    }
  }
  </script>
  
  <style scoped lang="scss">

.princpal-side-title {
  background: #cdcdcd;
  padding: 15px;
  font-weight: bold;
  text-align: left;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.4s ease-in-out;
  margin: 10px 0;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem !important;
    position: relative;
    z-index: 2;
  }

  .icon-arrow {
    margin-left: 10px;
    transition: transform 0.3s ease-in-out;
  }

  &.active {
    background: #ff6b07 !important;
    color: #fff;
  }

  /* Fond animé */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50% !important;
    width: 0;
    height: 100%;
    background: #ff6b07; /* Orange */
    transition: width 0.5s ease-in-out;
    z-index: 1;
    transform: translateX(-50%);
  }

  /* Effet hover */
  &:hover::before {
    width: 100%; /* Fond orange qui se développe des bords vers le centre */
    left: 0;
  }

  &:hover p {
    color: #fff; /* Changer la couleur du texte */
  }

  &:hover .icon-arrow {
    transform: translateX(5px); /* Décalage de la flèche */
    color: #fff;
  }

  /* Effet au retrait du hover */
  &:not(:hover)::before {
    width: 0; /* Retour au centre */
    left: 50%;
  }
}

  </style>